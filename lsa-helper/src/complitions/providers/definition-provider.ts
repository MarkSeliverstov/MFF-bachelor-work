import * as vscode from 'vscode'
import { config } from '../../extension'

export class EntitiesDocumentLinkProvider implements vscode.DocumentLinkProvider {
  /**
   * Hower all words after lc-identifier, make them clickable and open the browser
   */
  provideDocumentLinks(document: vscode.TextDocument): vscode.DocumentLink[] {
    const links: vscode.DocumentLink[] = []
    const text = document.getText()
    const findingPrefix = config.eiconfig.markers.prefix + config.eiconfig.markers.identifier
    const lcIdentifier = new RegExp(`(${findingPrefix}\\s+)([:\\w-]+)`, 'g')

    let match
    while ((match = lcIdentifier.exec(text))) {
      const startPos = document.positionAt(match.index + match[1].length)
      const endPos = document.positionAt(match.index + match[1].length + match[2].length)
      const linkRange = new vscode.Range(startPos, endPos)
      const link = new vscode.DocumentLink(
        linkRange,
        vscode.Uri.parse(`http://127.0.0.1:5173/entities?id=${match[2]}`),
      )
      links.push(link)
    }
    return links
  }
}
