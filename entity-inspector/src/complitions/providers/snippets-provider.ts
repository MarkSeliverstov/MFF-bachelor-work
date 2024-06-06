import * as vscode from 'vscode'
import { AnnotationMarkers } from '../../configuration'
import { getSnippets } from './snipppets'
/**
 * Provides inline completions snippets.
 */
export class SnippetsProvider implements vscode.InlineCompletionItemProvider {
  provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.InlineCompletionItem[]> {
    const textBeforeCursor = document.getText(
      new vscode.Range(position.with(undefined, 0), position),
    )

    const snippets = getSnippets()
    const suggestionItems: vscode.InlineCompletionItem[] = []

    for (const key in snippets) {
      if (textBeforeCursor.endsWith(AnnotationMarkers.prefix() + key)) {
        const snippet = snippets[key]
        suggestionItems.push(
          new vscode.InlineCompletionItem(
            snippet,
            new vscode.Range(position, position.translate(0, snippet.length)),
          ),
        )
      }
    }

    return suggestionItems
  }
}
