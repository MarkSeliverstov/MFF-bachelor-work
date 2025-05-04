import {
  InlineCompletionItem,
  InlineCompletionItemProvider,
  Position,
  ProviderResult,
  Range,
  TextDocument,
} from 'vscode'

import { config } from '../../extension'
import { getSnippets } from './snipppets'

/**
 * Provides inline completions snippets.
 */
export class SnippetsProvider implements InlineCompletionItemProvider {
  provideInlineCompletionItems(
    document: TextDocument,
    position: Position,
  ): ProviderResult<InlineCompletionItem[]> {
    const textBeforeCursor = document.getText(new Range(position.with(undefined, 0), position))
    const spacesBeforeTextCount =
      textBeforeCursor.search(/\S/) === -1 ? 0 : textBeforeCursor.search(/\S/)

    const snippets = getSnippets(spacesBeforeTextCount)
    const suggestionItems: InlineCompletionItem[] = []

    for (const key in snippets) {
      if (textBeforeCursor.endsWith(config.lsaConfig.markers.prefix + key)) {
        const snippet = snippets[key]
        suggestionItems.push(
          new InlineCompletionItem(
            snippet,
            new Range(position, position.translate(0, snippet.length)),
          ),
        )
      }
    }

    return suggestionItems
  }
}
