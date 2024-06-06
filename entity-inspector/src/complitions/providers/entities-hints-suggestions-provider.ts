import * as vscode from 'vscode'

import { getCmpFromServerAsync } from '../../server'

/**
 * Providers completions by current line via server
 */
export class ServerCmpProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    const line = document.lineAt(position).text.substring(0, position.character)

    const cmpItems: vscode.CompletionItem[] = []
    getCmpFromServerAsync(line)
      .then((items) => {
        items.forEach((item: string) => {
          console.log(`Creatin cmp item by: ${item}`)
          cmpItems.push(new vscode.CompletionItem(item, vscode.CompletionItemKind.Keyword))
        })
        console.log(items)
        return cmpItems
      })
      .catch(() => {
        return [] // Return an empty array in case of error
      })
    return cmpItems
  }
}
