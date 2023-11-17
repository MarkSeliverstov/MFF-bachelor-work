import * as vscode from 'vscode';

import path = require('path');
import { TextDecoder } from 'util';

const EXTENSION_NAME = "entity-inspector";
const USER_CONFIG = () => vscode.workspace.getConfiguration(EXTENSION_NAME);

/**
 * Configurates EI extension commands.
 */
export class Commands{
    static readonly exportModelCmd = () => `${EXTENSION_NAME}.exportModel`;
    static readonly runParserCmd = () => `${EXTENSION_NAME}.runParser`;
}

/**
 * User configuration of annotation prefixes.
 */
export class AnnotationMarkers{
    static readonly prefix = () => USER_CONFIG().get("prefixName", "@lc-");
    static readonly id = () => USER_CONFIG().get("identifierMarker", "identifier");
    static readonly alias = () => USER_CONFIG().get("nameMarker", "name");
    static readonly type = () => USER_CONFIG().get("typeMarker", "type");
    static readonly entity = () => USER_CONFIG().get("entityMarker", "entity");
    static readonly property = () => USER_CONFIG().get("propertyMarker", "property");
    static readonly method = () => USER_CONFIG().get("methodMarker", "method");
    static readonly description = () => USER_CONFIG().get("descriptionMarker", "description");
    static readonly source = () => USER_CONFIG().get("sourceMarker", "source");

    static readonly getAllPrefixValues = () => {
        return [
            AnnotationMarkers.id(),
            AnnotationMarkers.alias(),
            AnnotationMarkers.type(),
            AnnotationMarkers.entity(),
            AnnotationMarkers.property(),
            AnnotationMarkers.method(),
            AnnotationMarkers.description(),
            AnnotationMarkers.source()
        ];
    };
}

/**
 * Model source user definition.
 */
export const sourceDefinition = () => USER_CONFIG().get("sourceDefinition", "");

/**
 * Awesome parser helps to determine the format of languages using the installed extensions.
 */
class CommentsConfiguration{
    // languageId : Comment configuration
    private readonly commentConfig = new Map<LanguageId, CommentConfig | undefined>();
    private readonly languageConfigFiles = new Map<LanguageId, ConfigPath>();
    private readonly languageExtensionToLanguageId = new Map<LanguageExtenssion, LanguageId>();

    /**
     * Generate a map of configuration files by language as defined by default VScode extensions
     * External extensions can override default configurations os VSCode!
     */
    public updateLanguagesDefinitions() {
        this.commentConfig.clear();

        for (const extension of vscode.extensions.all) {
            const packageJSON = extension.packageJSON;

            if (packageJSON.contributes && packageJSON.contributes.languages) {
                for (const language of packageJSON.contributes.languages) {
                    if (language.configuration) {
                        try{
                            for (const extension of language.extensions){
                                this.languageExtensionToLanguageId.set(extension, language.id);
                            }
                        }
                        catch{ // if no extensions property in the language
                            continue;
                        }
                        const configPath = path.join(extension.extensionPath, language.configuration);
                        this.languageConfigFiles.set(language.id, configPath);
                    }
                }
            }
        }
    }

    /**
     * Adapter getet the configuration information for the specified language by file extension
     */
    public async getCommentConfigurationByExtension(extension: string)
        : Promise<CommentConfig | undefined> 
    {
        const languageId = this.languageExtensionToLanguageId.get(extension);
        if (languageId !== undefined){
            return await this.getCommentConfiguration(languageId);
        }
        return undefined;
    }

    /**
     * Gets the configuration information for the specified language
     */
    public async getCommentConfiguration(languageId: string)
        : Promise<CommentConfig | undefined> 
    {

        // check if the language config has already been loaded
        if (this.commentConfig.has(languageId)) {
            return this.commentConfig.get(languageId);
        }

        // if no config exists for this language, back out and leave the language unsupported
        if (!this.languageConfigFiles.has(languageId)) {
            return undefined;
        }

        try {
            // Get the filepath from the map
            const filePath = this.languageConfigFiles.get(languageId) as string;
            const rawContent = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
            const content = new TextDecoder().decode(rawContent);

            // use json5, because the config can contains comments
            const config = JSON.parse(content);

            this.commentConfig.set(languageId, config.comments);

            return config.comments;
        } catch (error) {
            this.commentConfig.set(languageId, undefined);
            return undefined;
        }
    }
}

export const commentsConfiguration = new CommentsConfiguration();
commentsConfiguration.updateLanguagesDefinitions();