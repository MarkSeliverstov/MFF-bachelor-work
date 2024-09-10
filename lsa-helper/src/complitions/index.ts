import * as vscode from 'vscode'
import { MarkerProvider } from './providers/completion-provider'
import { SuggestionProvider } from './providers/inline-complition-provider'
import { SnippetsProvider } from './providers/snippets-provider'
import { ServerCmpProvider } from './providers/entities-hints-suggestions-provider'
import { EntitiesDocumentLinkProvider } from './providers/definition-provider'

export function initComplitions(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider({ pattern: '**' }, new MarkerProvider()),

    vscode.languages.registerCompletionItemProvider({ pattern: '**' }, new ServerCmpProvider()),

    vscode.languages.registerInlineCompletionItemProvider(
      { pattern: '**' },
      new SuggestionProvider(),
    ),

    vscode.languages.registerInlineCompletionItemProvider(
      { pattern: '**' },
      new SnippetsProvider(),
    ),

    vscode.languages.registerDocumentLinkProvider(
      { pattern: '**' },
      new EntitiesDocumentLinkProvider(),
    ),
  )
}
