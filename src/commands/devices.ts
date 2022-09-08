import * as vscode from 'vscode';
import { Provider } from '../provider/devices';

let provider: Provider;

/**
 * Initializes the devices view of the extension.
 */
export function init(context: vscode.ExtensionContext) {
    provider = new Provider();
    context.subscriptions.push(vscode.window.registerTreeDataProvider('genv.devices', provider));
	context.subscriptions.push(vscode.commands.registerCommand('genv.devices.refresh', refresh));
}

/**
 * Refreshes the devices view.
 */
function refresh() {
    provider.refresh();
}
