import * as vscode from 'vscode';

let terminal: vscode.Terminal;

export function ensureTerminal(): vscode.Terminal {
	if (terminal === undefined || terminal.exitStatus !== undefined) {
		if (terminal !== undefined) {
			terminal.dispose();
		}

		terminal = vscode.window.createTerminal({ name: 'genv' });
	}

	return terminal;
}

export function sendText(text: string) {
    ensureTerminal().sendText(text);
}

export async function pid(): Promise<number | undefined> {
    return await ensureTerminal().processId;
}

export function dispose() {
    if (terminal !== undefined) {
        terminal.dispose();
    }
}
