import * as vscode from 'vscode';

import { AnnotationMarkers } from "../configuration";

/**
 * Providers completions user defined markers by prefix.
 */
export class MarkerProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[]> {
        const line = document.lineAt(position).text.substring(0, position.character);
        const completionItems: vscode.CompletionItem[] = [];
		if (line.match(AnnotationMarkers.prefix())) {
            AnnotationMarkers.getAllPrefixValues().forEach(prefixVal => {
                completionItems.push(
                    new vscode.CompletionItem(prefixVal),
                    );
                }); 
        }
		return completionItems;
    }
}