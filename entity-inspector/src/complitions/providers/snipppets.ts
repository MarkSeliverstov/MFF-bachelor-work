import { AnnotationMarkers, commentsConfiguration } from "../../configuration";
import { getCurrentFileLanguageId } from "../../utils/vscode-api";

export function getSnippets(): Snippets {
    const langId = getCurrentFileLanguageId();
    const commentConfig = langId ? commentsConfiguration.getCommentConfigurationByLangId(langId) : undefined;

    if (!commentConfig || !commentConfig.lineComment) {
        return {};
    }

    const commentLine = commentConfig.lineComment;
    const prefix = AnnotationMarkers.prefix();
    const baseWithId = `
${commentLine} ${prefix}identifier
${commentLine} ${prefix}name
${commentLine} ${prefix}description`;

    const base = `
${commentLine} ${prefix}name
${commentLine} ${prefix}description`;
    return {
        [AnnotationMarkers.entity()] : baseWithId,
        [AnnotationMarkers.property()] : base,
        [AnnotationMarkers.method()] : base
    };
}
   