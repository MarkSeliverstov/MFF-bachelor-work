import * as vscode from 'vscode'
import * as path from 'path'

import { TextDecoder } from 'util'

async function readConfigFile(relativeFilePath: string): Promise<Map<string, string>> {
  const configPath = path.join(__dirname, relativeFilePath)
  const file = vscode.Uri.file(configPath)

  try {
    const rawContent = await vscode.workspace.fs.readFile(file)
    const content = new TextDecoder().decode(rawContent)
    return JSON.parse(content)
  } catch (error) {
    console.log('EI configuration file not found!')
    return new Map<string, string>()
  }
}

async function getConfig(relativeFilePath: string): Promise<ConfigType> {
  const config = await readConfigFile(relativeFilePath)
  return {
    get: (key: string, defaultValue: string) => {
      return config.get(key) || defaultValue
    },
  }
}

class AnnotationMarkers {
  private prefixValue: string
  private idValue: string
  private aliasValue: string
  private typeValue: string
  private entityValue: string
  private propertyValue: string
  private methodValue: string
  private descriptionValue: string
  private sourceValue: string

  constructor(private config: ConfigType) {
    this.prefixValue = this.config.get('prefixName', '@lc-')
    this.idValue = this.config.get('identifierMarker', 'identifier')
    this.aliasValue = this.config.get('nameMarker', 'name')
    this.typeValue = this.config.get('typeMarker', 'type')
    this.entityValue = this.config.get('entityMarker', 'entity')
    this.propertyValue = this.config.get('propertyMarker', 'property')
    this.methodValue = this.config.get('methodMarker', 'method')
    this.descriptionValue = this.config.get('descriptionMarker', 'description')
    this.sourceValue = this.config.get('sourceMarker', 'source')
  }

  prefix(): string {
    return this.prefixValue
  }

  id(): string {
    return this.idValue
  }

  alias(): string {
    return this.aliasValue
  }

  type(): string {
    return this.typeValue
  }

  entity(): string {
    return this.entityValue
  }

  property(): string {
    return this.propertyValue
  }

  method(): string {
    return this.methodValue
  }

  description(): string {
    return this.descriptionValue
  }

  source(): string {
    return this.sourceValue
  }

  getAllPrefixValues(): string[] {
    return [
      this.id(),
      this.alias(),
      this.type(),
      this.entity(),
      this.property(),
      this.method(),
      this.description(),
      this.source(),
    ]
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
  private _config: ConfigType | null = null
  private _annotationMarkers: AnnotationMarkers | null = null
  private _commentsConfiguration: CommentsConfiguration | null = null

  async init(relativeFilePath: string = 'ei-config.json'): Promise<void> {
    this._config = await getConfig(relativeFilePath)
    this._annotationMarkers = new AnnotationMarkers(this._config)
    this._commentsConfiguration = new CommentsConfiguration()
    this._commentsConfiguration.updateLanguagesDefinitions()
    this._commentsConfiguration.initAllLanguages()
  }

  get serverUrl(): string {
    return this._config!.get('serverUrl', 'http://localhost:8080')
  }

  get annotationMarkers(): AnnotationMarkers {
    if (!this._annotationMarkers) {
      throw new Error('Annotation markers not initialized')
    }
    return this._annotationMarkers
  }

  get commentsConfiguration(): CommentsConfiguration {
    if (!this._commentsConfiguration) {
      throw new Error('Comments configuration not initialized')
    }
    return this._commentsConfiguration
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
