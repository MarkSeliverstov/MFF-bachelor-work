import * as vscode from 'vscode'
import * as path from 'path'

import { TextDecoder } from 'util'

const DEFAULT_CONFIG: EIConfigType = {
  prefix: '@lc-',
  markers: {
    identifier: 'identifier',
    name: 'name',
    type: 'type',
    description: 'description',
    entity: 'entity',
    property: 'property',
    method: 'method',
    source: 'source',
  },
  output: {
    entities: 'entities.json',
    annotations: 'annotations.json',
  },
  server: {
    url: 'http://localhost:5000',
  },
  parser: {
    exclude: [],
    extend: new Map<string, string>(),
  },
}

async function getConfig(relativeFilePath: string): Promise<EIConfigType> {
  const configPath: string = path.join(vscode.workspace.rootPath || '', relativeFilePath)
  const file: vscode.Uri = vscode.Uri.file(configPath)
  try {
    const rawContent: Uint8Array = await vscode.workspace.fs.readFile(file)
    const content: string = new TextDecoder().decode(rawContent)
    const user_config: EIConfigType = JSON.parse(content)
    return {
      prefix: user_config.prefix || DEFAULT_CONFIG.prefix,
      markers: {
        identifier: user_config.markers.identifier || DEFAULT_CONFIG.markers.identifier,
        name: user_config.markers.name || DEFAULT_CONFIG.markers.name,
        type: user_config.markers.type || DEFAULT_CONFIG.markers.type,
        description: user_config.markers.description || DEFAULT_CONFIG.markers.description,
        entity: user_config.markers.entity || DEFAULT_CONFIG.markers.entity,
        property: user_config.markers.property || DEFAULT_CONFIG.markers.property,
        method: user_config.markers.method || DEFAULT_CONFIG.markers.method,
        source: user_config.markers.source || DEFAULT_CONFIG.markers.source,
      },
      output: {
        entities: user_config.output.entities || DEFAULT_CONFIG.output.entities,
        annotations: user_config.output.annotations || DEFAULT_CONFIG.output.annotations,
      },
      server: {
        url: user_config.server.url || DEFAULT_CONFIG.server.url,
      },
      parser: {
        exclude: user_config.parser.exclude || DEFAULT_CONFIG.parser.exclude,
        extend: user_config.parser.extend || DEFAULT_CONFIG.parser.extend,
      },
    }
  } catch (error) {
    console.log('EI configuration file not found, using default configuration')
    return DEFAULT_CONFIG
  }
}

/**
 * Awesome parser helps to determine the format of languages using the installed extensions.
 */
export class CommentsConfiguration {
  // languageId : Comment configuration
  private readonly commentConfig = new Map<LanguageId, CommentConfig | undefined>()
  private readonly languageConfigFiles = new Map<LanguageId, ConfigPath>()
  private readonly languageExtensionToLanguageId = new Map<LanguageExtenssion, LanguageId>()

  /**
   * Generate a map of configuration files by language as defined by default VScode extensions
   * External extensions can override default configurations os VSCode!
   */
  public updateLanguagesDefinitions() {
    this.commentConfig.clear()

    for (const extension of vscode.extensions.all) {
      const packageJSON = extension.packageJSON

      if (packageJSON.contributes && packageJSON.contributes.languages) {
        for (const language of packageJSON.contributes.languages) {
          if (language.configuration) {
            try {
              for (const extension of language.extensions) {
                this.languageExtensionToLanguageId.set(extension, language.id)
              }
            } catch {
              // if no extensions property in the language
              continue
            }
            const configPath = path.join(extension.extensionPath, language.configuration)
            this.languageConfigFiles.set(language.id, configPath)
          }
        }
      }
    }
  }

  public async initAllLanguages() {
    // Iterate over all language IDs in the languageConfigFiles map
    for (const [languageId, filePath] of this.languageConfigFiles) {
      try {
        // Read the file for the current language
        const rawContent = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath))
        const content = new TextDecoder().decode(rawContent)

        // Use json5 or similar, because the config can contain comments
        const config = JSON.parse(content)

        // Store the comment configuration for the language
        this.commentConfig.set(languageId, config.comments)
      } catch (error) {
        // In case of an error, set the comment configuration for this language to undefined
        this.commentConfig.set(languageId, undefined)
      }
    }
  }

  /**
   * Adapter getet the configuration information for the specified language by file extension
   */
  public getCommentConfigurationByExtension(extension: string): CommentConfig | undefined {
    const languageId = this.languageExtensionToLanguageId.get(extension)
    if (languageId !== undefined) {
      return this.getCommentConfigurationByLangId(languageId)
    }
    return undefined
  }

  /**
   * Gets the configuration information for the specified language
   */
  public getCommentConfigurationByLangId(languageId: string): CommentConfig | undefined {
    // check if the language config has already been loaded
    if (this.commentConfig.has(languageId)) {
      return this.commentConfig.get(languageId)
    } else {
      return undefined
    }
  }
}

/**
 * Configurates EI extension.
 */
export class Config {
  private _eiconfig: EIConfigType | null = null
  private _commentsConfiguration: CommentsConfiguration | null = null

  async init(relativeFilePath: string = 'ei-config.json'): Promise<void> {
    this._eiconfig = await getConfig(relativeFilePath)
    this._commentsConfiguration = new CommentsConfiguration()
    this._commentsConfiguration.updateLanguagesDefinitions()
    this._commentsConfiguration.initAllLanguages()
  }

  get eiconfig(): EIConfigType {
    if (!this._eiconfig) {
      throw new Error('Configuration not initialized')
    }
    return this._eiconfig
  }

  get commentsConfiguration(): CommentsConfiguration {
    if (!this._commentsConfiguration) {
      throw new Error('Comments configuration not initialized')
    }
    return this._commentsConfiguration
  }

  get allAnnotationMarkersNames(): string[] {
    return Object.values(this.eiconfig.markers)
  }
}

/**
 * Configurates EI extension commands.
 */
const EXTENSION_NAME = 'entity-inspector'
export class Commands {
  static readonly exportModelCmd = () => `${EXTENSION_NAME}.exportModel`
  static readonly runParserCmd = () => `${EXTENSION_NAME}.runParser`
}
