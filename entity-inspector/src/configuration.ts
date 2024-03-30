import * as vscode from 'vscode';

import path = require('path');
import { TextDecoder } from 'util';

const EXTENSION_NAME = "entity-inspector";
const EI_CONFIG = "ei-config.json";


async function readConfigFile(): Promise<Map<string, string>>{
    const configPath = path.join(__dirname, EI_CONFIG);
    const file = vscode.Uri.file(configPath);
    if (!vscode.workspace.fs.stat(file)){
        console.log("EI configuration file not found!");
        return new Map<string, string>();
    }
    const rawContent = await vscode.workspace.fs.readFile(file);
    const content = new TextDecoder().decode(rawContent);
    return JSON.parse(content);
}

const USER_CONFIG = (config: Map<string, string>) => {
    return {
        get: (key: string, defaultValue: string) => {
            return config.get(key) || defaultValue;
        }
    };
};


/**
 * User defined server
 */
export const serverURL = () => USER_CONFIG().get("serverUrl", "");

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

    public async initAllLanguages() {
        // Iterate over all language IDs in the languageConfigFiles map
        for (const [languageId, filePath] of this.languageConfigFiles) {
            try {
                // Read the file for the current language
                const rawContent = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
                const content = new TextDecoder().decode(rawContent);
    
                // Use json5 or similar, because the config can contain comments
                const config = JSON.parse(content);
    
                // Store the comment configuration for the language
                this.commentConfig.set(languageId, config.comments);
            } catch (error) {
                // In case of an error, set the comment configuration for this language to undefined
                this.commentConfig.set(languageId, undefined);
            }
        }
    }

    /**
     * Adapter getet the configuration information for the specified language by file extension
     */
    public getCommentConfigurationByExtension(extension: string)
        : CommentConfig | undefined 
    {
        const languageId = this.languageExtensionToLanguageId.get(extension);
        if (languageId !== undefined){
            return this.getCommentConfigurationByLangId(languageId);
        }
        return undefined;
    }

    /**
     * Gets the configuration information for the specified language
     */
    public getCommentConfigurationByLangId(languageId: string)
        : CommentConfig | undefined 
    {

        // check if the language config has already been loaded
        if (this.commentConfig.has(languageId)) {
            return this.commentConfig.get(languageId);
        } else {
            return undefined;
        }
    }
}

export const commentsConfiguration = new CommentsConfiguration();
commentsConfiguration.updateLanguagesDefinitions();
commentsConfiguration.initAllLanguages();
