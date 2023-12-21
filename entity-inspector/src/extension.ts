import * as vscode from 'vscode';

import { commentsConfiguration } from './configuration';
import { initComplitions } from './complitions';
import { getModel, saveModel } from './http-api';
import { mockInstanceModel } from './model/mocker';
import { InstanceModel } from './model';

export let model: InstanceModel | null = null;
// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
	console.log('Yep, "entity-inspector" is now active!');
    model = await getModel();
	// Handle extensions being added or removed
    vscode.extensions.onDidChange(() => {
        commentsConfiguration.updateLanguagesDefinitions();
    }, null, context.subscriptions);
    
    vscode.workspace.onDidSaveTextDocument((doc: vscode.TextDocument) => {
        // Change model
        saveModel(mockInstanceModel());
    });

	initComplitions(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('Oh no, "entity-inspector" is now deactivated!');
}