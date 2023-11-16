import * as vscode from 'vscode';

import { commentsConfiguration } from './configuration';
import { initComplitions } from './complitions';

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
	console.log('Yep, "entity-inspector" is now active!');
	
	// Handle extensions being added or removed
    vscode.extensions.onDidChange(() => {
        commentsConfiguration.updateLanguagesDefinitions();
    }, null, context.subscriptions);

	initComplitions(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('Oh no, "entity-inspector" is now deactivated!');
}