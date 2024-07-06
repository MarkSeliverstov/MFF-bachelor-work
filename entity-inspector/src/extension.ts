import * as vscode from 'vscode'

import { commentsConfiguration, Commands } from './configuration'
import { initComplitions } from './complitions'
import { getModel, saveModel, saveAnnotations } from './server'
import { mockInstanceModel } from './model/mocker'
import { InstanceModel, AnnotationModel } from './model'
import { AnnotationReader } from './exporter'

export let model: InstanceModel | null = null
let anotationModel: AnnotationModel
// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
  console.log('Yep, "entity-inspector" is now active!')
  model = await getModel()
  // Handle extensions being added or removed
  vscode.extensions.onDidChange(
    () => {
      commentsConfiguration.updateLanguagesDefinitions()
    },
    null,
    context.subscriptions,
  )

  vscode.workspace.onDidSaveTextDocument(() => {
    // Change model
    saveModel(mockInstanceModel())
  })

  initComplitions(context)
  registerCommands(context, new AnnotationReader())
}

function registerCommands(context: vscode.ExtensionContext, reader: AnnotationReader): void {
  const runParserHandler = async () => {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        cancellable: true,
        title: 'Parsing',
      },
      async (progress, token) => {
        token.onCancellationRequested(() => {
          console.log('User canceled the parsing')
        })
        anotationModel = await reader.parseWorkspace(progress, token)
        progress.report({ message: 'exorting model to the server' })
        saveAnnotations(anotationModel)
      },
    )
  }
  context.subscriptions.push(
    vscode.commands.registerCommand(Commands.runParserCmd(), runParserHandler),
  )
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log('Oh no, "entity-inspector" is now deactivated!')
}
