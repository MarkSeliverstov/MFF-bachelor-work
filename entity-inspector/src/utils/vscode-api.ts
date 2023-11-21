import * as vscode from 'vscode';

export function getCurrentFileLanguageId(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    return editor?.document.languageId;
}