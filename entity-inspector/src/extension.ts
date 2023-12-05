import * as vscode from 'vscode';

import { commentsConfiguration } from './configuration';
import { initComplitions } from './complitions';
import { getModel, saveModel } from './http-api';
import { AnnotationModel, SourceFileAnnotations } from './model/annotation-model';

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
	console.log('Yep, "entity-inspector" is now active!');
    const fa : SourceFileAnnotations = {
        relativeFilePath: "PATH_TO_ANNOTATION",
        annotations: []
    };
    const model:  AnnotationModel = {
        filesAnnotations: [fa]
    };
	console.log(getModel());
    saveModel(model);
	console.log(getModel());

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