import * as vscode from 'vscode';

import { AnnotationMarkers } from "../../configuration";
import { getModel } from "../../http-api";
import { model } from "../../extension";

/**
 * Providers completions user defined markers by prefix.
 */
export class EntitiesHintsProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[]> {
        const line = document.lineAt(position).text.substring(0, position.character);
        const completionItems: vscode.CompletionItem[] = [];
		if (line.match(AnnotationMarkers.prefix() + AnnotationMarkers.id() + " :")) {
            console.error(model);
            if (model !== null) {
                model.entities.forEach(en => {
                    console.error(en);
                    completionItems.push(
                        new vscode.CompletionItem(
                            en.identifier, 
                            vscode.CompletionItemKind.Keyword
                        )
                    );
                });
            }
        }
		return completionItems;
    }
}
