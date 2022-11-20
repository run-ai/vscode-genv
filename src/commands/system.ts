import * as vscode from 'vscode';
import { Provider } from '../provider/system';

let provider: Provider;

/**
 * Initializes the system related features of the extension.
 *
 * This includes the view and commands.
 */
export function init(context: vscode.ExtensionContext) {
  provider = new Provider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider('genv.system', provider));
	context.subscriptions.push(vscode.commands.registerCommand('genv.system.refresh', refresh));
}

/**
 * Refreshes the status of the system.
 */
function refresh() {
  provider.refresh();
}
