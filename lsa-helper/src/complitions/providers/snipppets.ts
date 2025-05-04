import { config } from '../../extension'
import { getCurrentFileLanguageId } from '../../utils/vscode-api'

export function getSnippets(spacesBeforeTextCount: number): Record<string, string> {
  const langId = getCurrentFileLanguageId()
  const commentConfig = langId
    ? config.commentsConfiguration.getCommentConfigurationByLangId(langId)
    : undefined

  if (!commentConfig || !commentConfig.lineComment) {
    return {}
  }

  const space = ' '.repeat(spacesBeforeTextCount)
  const commentLine = commentConfig.lineComment
  const prefix = config.eiconfig.markers.prefix
  const base = `
${space}${commentLine} ${prefix}name
${space}${commentLine} ${prefix}description`

  const entitySnippet = `
${space}${commentLine} ${prefix}identifier
${base}`

  return {
    [config.eiconfig.markers.entity]: entitySnippet,
    [config.eiconfig.markers.property]: base,
    [config.eiconfig.markers.method]: base,
  }
}
