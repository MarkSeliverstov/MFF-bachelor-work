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
  const prefix = config.eiconfig.prefix
  const base = `
${commentLine} ${prefix}name
${commentLine} ${prefix}description`

  return {
    [config.eiconfig.markers.entity]: `
${commentLine} ${prefix}identifier
${base}`,
    [config.eiconfig.markers.property]: base,
    [config.eiconfig.markers.property]: base,
  }
}
