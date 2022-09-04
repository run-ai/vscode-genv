import * as vscode from 'vscode';
import * as control from './control';
import * as environment from './environment';
import * as utils from './utils';

let statusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('vscode-genv.activate', async () => {
		if (environment.activated()) {
			vscode.window.showWarningMessage('Already running in an activated GPU environment');
		} else {
			environment.activate();
			environment.configName(`vscode/${vscode.workspace.name}`);

			await utils.sleep(1000); // wait a bit for the command to actually take place

			for (let terminal of vscode.window.terminals) {
				terminal.sendText(`genv activate --id ${environment.eid} --quiet`);
			}

			context.subscriptions.push(vscode.window.onDidOpenTerminal(terminal => {
				terminal.sendText(`genv activate --id ${environment.eid}`);
			}));

			statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
			statusBarItem.command = 'vscode-genv.attach';
			statusBarItem.tooltip = 'This environment is not attached to any GPU';
			statusBarItem.text = 'No GPUs';
			statusBarItem.show();
			context.subscriptions.push(statusBarItem);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscode-genv.config.gpus', async () => {
		if (environment.activated()) {
			const input: string | undefined = await vscode.window.showInputBox({
				placeHolder: 'Enter GPU count for the environment',
				validateInput: function(input: string): string | undefined {
					return /^([1-9]\d*)?$/.test(input) ? undefined : 'Must be an integer grather than 0';
				}
			});

			if (input) {
				const gpus: number = parseInt(input);

				environment.configGPUs(gpus);

				await utils.sleep(1000); // wait a bit for the command to actually take place

				for (let terminal of vscode.window.terminals) {
					terminal.sendText('genv config gpus --refresh');
				}
			}
		} else {
			vscode.window.showErrorMessage('Not running in an activated GPU environment');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscode-genv.config.name', async () => {
		if (environment.activated()) {
			const name: string | undefined = await vscode.window.showInputBox({
				placeHolder: 'Enter name for the environment',
			});

			if (name) {
				environment.configName(name);

				await utils.sleep(1000); // wait a bit for the command to actually take place

				for (let terminal of vscode.window.terminals) {
					terminal.sendText('genv config name --refresh');
				}
			}
		} else {
			vscode.window.showErrorMessage('Not running in an activated GPU environment');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscode-genv.attach', async () => {
		if (environment.activated()) {
			if (environment.gpus === undefined) {
				await vscode.commands.executeCommand('vscode-genv.config.gpus');
			}

			environment.attach();

			await utils.sleep(1000); // wait a bit for the command to actually take place

			for (let terminal of vscode.window.terminals) {
				terminal.sendText('genv attach --refresh');
			}

			statusBarItem.text = environment.gpus === 1 ? '1 GPU' : `${environment.gpus} GPUs`;
			statusBarItem.tooltip = `This environment is attached to ${statusBarItem.text}`;
			statusBarItem.command = undefined;
		} else {
			vscode.window.showErrorMessage('Not running in an activated GPU environment');
		}
	}));
}

export function deactivate() {
	control.dispose();
}
