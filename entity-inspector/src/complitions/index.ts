import * as vscode from 'vscode';
import { MarkerProvider } from './completion-provider';
import { SuggestionProvider } from './inline-complition-provider';

export function initComplitions(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			{pattern: "**"}, // for all files
			new MarkerProvider()),
			
		vscode.languages.registerInlineCompletionItemProvider(
			{pattern: "**"}, // for all files
			new SuggestionProvider()),
	);
}
