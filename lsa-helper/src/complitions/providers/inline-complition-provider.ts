import {
  InlineCompletionItemProvider,
  TextDocument,
  Position,
  Range,
  InlineCompletionItem,
  ProviderResult,
} from 'vscode'

import { config } from '../../extension'

/**
 * Provides inline completions suggestions about user defined model source.
 */
export class SuggestionProvider implements InlineCompletionItemProvider {
  provideInlineCompletionItems(
    document: TextDocument,
    position: Position,
  ): ProviderResult<InlineCompletionItem[]> {
    const textBeforeCursor = document.getText(new Range(position.with(undefined, 0), position))

    const suggestionItems: InlineCompletionItem[] = []
    const prefix = config.eiconfig.markers.prefix
    const source = config.eiconfig.markers.source
    const serverUrl = config.eiconfig.server.url

    if (
      textBeforeCursor.match(prefix + source + ' ') &&
      serverUrl !== '' &&
      !textBeforeCursor.match(serverUrl)
    ) {
      suggestionItems.push(
        new InlineCompletionItem(
          serverUrl,
          new Range(position, position.translate(0, serverUrl.length)),
        ),
      )
    }
    return suggestionItems
  }
}
