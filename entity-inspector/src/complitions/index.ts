import * as vscode from 'vscode';
import { MarkerProvider } from './providers/completion-provider';
import { SuggestionProvider } from './providers/inline-complition-provider';
import { SnippetsProvider } from './providers/snippets-provider';

export function initComplitions(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			{pattern: "**"}, // for all files
			new MarkerProvider()),
			
		vscode.languages.registerInlineCompletionItemProvider(
			{pattern: "**"}, // for all files
			new SuggestionProvider()),
		
		vscode.languages.registerInlineCompletionItemProvider(
			{pattern: "**"}, // for all files
			new SnippetsProvider()),
	);
}
