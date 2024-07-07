import { config } from '../../extension'
import { getCurrentFileLanguageId } from '../../utils/vscode-api'

export function getSnippets(): Snippets {
  const langId = getCurrentFileLanguageId()
  const commentConfig = langId
    ? config.commentsConfiguration.getCommentConfigurationByLangId(langId)
    : undefined

  if (!commentConfig || !commentConfig.lineComment) {
    return {}
  }

  const commentLine = commentConfig.lineComment
  const prefix = config.annotationMarkers.prefix()
  const base = `
${commentLine} ${prefix}name
${commentLine} ${prefix}description`

  return {
    [config.annotationMarkers.entity()]: `
${commentLine} ${prefix}identifier
${base}`,
    [config.annotationMarkers.property()]: base,
    [config.annotationMarkers.method()]: base,
  }
}
