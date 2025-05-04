import * as vscode from 'vscode'

import { config } from '../../extension'

function createIdentifier() {
  const time = new Date().getTime()
  return (
    time +
    '-xxxx-yxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  )
}
/**
 * Providers completions user defined markers by prefix.
 */
export class MarkerProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    const line = document.lineAt(position).text.substring(0, position.character)
    const completionItems: vscode.CompletionItem[] = []

    const prefix = config.lsaConfig.markers.prefix
    const id = config.lsaConfig.markers.identifier

    if (line.endsWith(prefix)) {
      config.allAnnotationMarkersNames.forEach((prefixVal) => {
        completionItems.push(new vscode.CompletionItem(prefixVal))
      })
    }

    if (line.endsWith(prefix + id + ' :')) {
      console.log('Adding id completion item')
      completionItems.push(new vscode.CompletionItem(createIdentifier()))
    }
    console.log('Completion items: ', completionItems)
    return completionItems
  }
}
