import * as vscode from 'vscode';
import { Provider } from '../provider/envs';

let provider: Provider;

/**
 * Initializes the environments view of the extension.
 */
export function init(context: vscode.ExtensionContext) {
    provider = new Provider();
    context.subscriptions.push(vscode.window.registerTreeDataProvider('genv.envs', provider));
	context.subscriptions.push(vscode.commands.registerCommand('genv.envs.refresh', refresh));
}

/**
 * Refreshes the environments view.
 */
function refresh() {
    provider.refresh();
}
