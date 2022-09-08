import * as vscode from 'vscode';
import * as installation from '../genv/installation';
import * as terminal from '../genv/terminal';

/**
 * Initializes the installation related features of the extension.
 */
export function init(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('genv.installation.install', install));
    context.subscriptions.push(vscode.commands.registerCommand('genv.installation.refresh', refresh));

    refresh();
}

/**
 * Installs genv on the machine and adds genv support to all open terminals.
 */
async function install() {
    vscode.window.showInformationMessage(`Downloading and installing genv at ${installation.root()}`);

    await installation.install();

    vscode.window.terminals.forEach(terminal.init);

    refresh();
}

/**
 * Refreshes installation status.
 */
function refresh() {
    const installed = installation.installed();

    vscode.commands.executeCommand('setContext', 'genv.installation.installed', installed);
    vscode.commands.executeCommand('setContext', 'genv.installation.uninstalled', !installed);
}
