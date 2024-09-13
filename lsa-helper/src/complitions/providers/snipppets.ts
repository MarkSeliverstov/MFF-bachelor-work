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
  const prefix = config.eiconfig.markers.prefix
  const base = `${commentLine} ${prefix}name
${commentLine} ${prefix}description`

  const entitySnippet = `
${commentLine} ${prefix}identifier
${base}`

  return {
    [config.eiconfig.markers.entity]: entitySnippet,
    [config.eiconfig.markers.property]: base,
    [config.eiconfig.markers.method]: base,
  }
}
