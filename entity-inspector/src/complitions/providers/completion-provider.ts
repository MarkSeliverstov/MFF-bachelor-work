import * as vscode from 'vscode'

import { AnnotationMarkers } from '../../configuration'

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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
    if (line.endsWith(AnnotationMarkers.prefix())) {
      AnnotationMarkers.getAllPrefixValues().forEach((prefixVal) => {
        completionItems.push(new vscode.CompletionItem(prefixVal))
      })
    }

    if (line.endsWith(AnnotationMarkers.prefix() + AnnotationMarkers.id() + ' :')) {
      console.log('Adding id completion item')
      completionItems.push(new vscode.CompletionItem(generateId()))
    }
    console.log('Completion items: ', completionItems)
    return completionItems
  }
}
