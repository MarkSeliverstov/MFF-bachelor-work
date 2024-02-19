import { TextEncoder } from 'util';
import * as vscode from 'vscode';

export async function exportModel(data: object, fileName: string): Promise<void> {
    const modelJson = JSON.stringify(data, null, 4);
    const workspace = vscode.workspace;

    if (workspace !== undefined){
        const folders = workspace.workspaceFolders;
        
        if (folders !== undefined){
            try{
                const path = vscode.Uri.file(`${folders[0].uri}/${fileName}`);
                await workspace.fs.writeFile(path, new TextEncoder().encode(modelJson));
                vscode.window.showTextDocument(path, { preview: false });
            } catch (error) {
                if (error instanceof vscode.FileSystemError){
                    vscode.window.showErrorMessage("EI can't export model, you have readonly file system");
                }
            }
        }
    }
}
