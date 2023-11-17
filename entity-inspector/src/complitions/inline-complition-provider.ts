import * as vscode from 'vscode';
import { AnnotationMarkers, sourceDefinition } from "../configuration";

/**
 * Provides inline completions suggestions.
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
            && sourceDefinition() !== ""
            && !textBeforeCursor.match(sourceDefinition())
        ) {
            suggestionItems.push(
                new vscode.InlineCompletionItem(
                    sourceDefinition(), 
                    new vscode.Range(
                        position, position.translate(0, sourceDefinition().length)
                    )
                )
            );
        }


        // if (textBeforeCursor.endsWith('mySugg')) {
        //     suggestionItems.push(
        //         new vscode.InlineCompletionItem('estion\nThis is the first of sugg.\nyou can change it option + ] or [', new vscode.Range(position, position.translate(0, 10))),
        //         new vscode.InlineCompletionItem('estion 2\nThis is the second of sugg', new vscode.Range(position, position.translate(0, 10))),
        //     );
        // }
        return suggestionItems;
    }
}
