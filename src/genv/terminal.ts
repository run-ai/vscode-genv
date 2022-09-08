import * as vscode from 'vscode';
import * as env from './env';
import * as installation from './installation';

/**
 * Adds genv support to a terminal.
 */
export function init(terminal: vscode.Terminal) {
    for (let command of installation.initTerminalCommands()) {
        terminal.sendText(command);
    }
}

/**
 * Activates a terminal in the active environment.
 */
export function activate(terminal: vscode.Terminal) {
    terminal.sendText(`genv activate --id ${env.eid} --no-load --no-attach --no-prompt`);
}

/**
 * Activates a terminal only if the environment is active.
 */
export function activateIfEnvActivated(terminal: vscode.Terminal) {
    if (env.activated()) {
        activate(terminal);
    }
}
