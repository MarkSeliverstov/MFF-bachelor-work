import * as vscode from 'vscode';
import { AnnotationMarkers, sourceDefinitionURL } from "../../configuration";

/**
 * Provides inline completions suggestions about user defined model source.
 */
export class SuggestionProvider implements vscode.InlineCompletionItemProvider {
    provideInlineCompletionItems(document: vscode.TextDocument, position: vscode.Position): 
    vscode.ProviderResult<vscode.InlineCompletionItem[]> {
        const textBeforeCursor = document.getText(
            new vscode.Range(position.with(undefined, 0), position)
        );
        
        
        const suggestionItems: vscode.InlineCompletionItem[] = [];
        if (
            textBeforeCursor.match(AnnotationMarkers.prefix() + AnnotationMarkers.source() + " ") 
            && sourceDefinitionURL() !== ""
            && !textBeforeCursor.match(sourceDefinitionURL())
        ) {
            suggestionItems.push(
                new vscode.InlineCompletionItem(
                    sourceDefinitionURL(), 
                    new vscode.Range(
                        position, position.translate(0, sourceDefinitionURL().length)
                    )
                )
            );
        }
        return suggestionItems;
    }
}
