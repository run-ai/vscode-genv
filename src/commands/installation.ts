import * as vscode from 'vscode';
import * as installation from '../genv/installation';

export async function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('genv.installation.install', install));
    context.subscriptions.push(vscode.commands.registerCommand('genv.installation.refresh', refresh));

    refresh();
}

async function install() {
    vscode.window.showInformationMessage(`Downloading and installing genv at ${installation.root()}`);

    await installation.install();

    for (let terminal of vscode.window.terminals) {
        for (let command of installation.initTerminalCommands()) {
            terminal.sendText(command);
        }
    }

    refresh();
}

function refresh() {
    const installed = installation.installed();

    vscode.commands.executeCommand('setContext', 'genv.installation.installed', installed);
    vscode.commands.executeCommand('setContext', 'genv.installation.uninstalled', !installed);
}
