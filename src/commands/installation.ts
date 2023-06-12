import * as vscode from 'vscode';
import * as installation from '../genv/installation';
import * as terminal from '../genv/terminal';

/**
 * Initializes the installation related features of the extension.
 */
export async function init(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('genv.installation.install', install));
    context.subscriptions.push(vscode.commands.registerCommand('genv.installation.refresh', refresh));

    await refresh();
}

/**
 * Installs genv on the machine and adds genv support to all open terminals.
 */
async function install() {
    vscode.window.showInformationMessage('Installing Genv with "pip install genv"');

    await installation.install();

    vscode.window.terminals.forEach(terminal.init);

    await refresh();
}

/**
 * Refreshes installation status.
 */
async function refresh() {
    const installed = await installation.installed();

    vscode.commands.executeCommand('setContext', 'genv.installation.installed', installed);
    vscode.commands.executeCommand('setContext', 'genv.installation.uninstalled', !installed);
}
