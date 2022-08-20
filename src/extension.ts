// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as _ from 'lodash';

let statusBarItem: vscode.StatusBarItem;
const numOfGpus: number = 8;
let usedGpuIndex: number = _.random(0, numOfGpus - 1, false);
const username: string = 'raz';

type GpuIndexItem = vscode.QuickPickItem & { index: number };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-rnenv" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-rnenv.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		const commandId = 'rnenv.showUsedGpuIndex';

		context.subscriptions.push(vscode.commands.registerCommand(commandId, async () => {
			const items: GpuIndexItem[] = Array.from(Array(numOfGpus), (_, index) => getGpuIndexItem(index));
			const options: vscode.QuickPickOptions = {
				title: 'Choose a GPU to use',
			};

			const selection = await vscode.window.showQuickPick(items, options);

			if (selection !== undefined && selection.index !== usedGpuIndex) {
				usedGpuIndex = selection.index;
				vscode.window.showInformationMessage(`Environment is now using GPU ${selection.index}`);
				updateStatusBarItem();
			}
		}));

		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
		statusBarItem.command = commandId;
		statusBarItem.tooltip = `This environment is using GPU at index ${usedGpuIndex}`;
		statusBarItem.show();
		context.subscriptions.push(statusBarItem);

		vscode.window.showInformationMessage(`GPU environment activated and using GPU ${usedGpuIndex}`);
		updateStatusBarItem();
	});

	context.subscriptions.push(disposable);
}

function getGpuIndexItem(index: number): GpuIndexItem {
	let label: string;
	let description: string | undefined = undefined;

	if (index === usedGpuIndex) {
		label = `$(circle-filled) GPU ${index} (${username})`;
		description = 'active environment is using this device';
	} else if (_.sample([true, false])) {
		const username = _.sample(['john', 'george', 'ringo', 'paul']);
		label = `GPU ${index} (${username})`;
	} else {
		label = `GPU ${index}`;
	}

	return {
		index: index,
		label: label,
		description: description,
	};
}

function updateStatusBarItem(): void {
	statusBarItem.text = `$(organization) GPU ${usedGpuIndex}`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
