import * as vscode from 'vscode';
import * as environment from './environment';
import { DevicesProvider } from './provider/devices';
import { EnvsProvider } from './provider/envs';

let statusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
  const devicesProvider = new DevicesProvider();

  context.subscriptions.push(vscode.window.registerTreeDataProvider('genv.devices', devicesProvider));
  context.subscriptions.push(vscode.commands.registerCommand('genv.devices.refresh', () => {
    devicesProvider.refresh();
	}));

  const envsProvider = new EnvsProvider();

	context.subscriptions.push(vscode.window.registerTreeDataProvider('genv.envs', envsProvider));
	context.subscriptions.push(vscode.commands.registerCommand('genv.envs.refresh', () => {
		envsProvider.refresh();
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.activate', async () => {
    if (environment.activated()) {
      vscode.window.showWarningMessage('Already running in an activated GPU environment');
    } else {
      await environment.activate();
      await environment.configName(`vscode/${vscode.workspace.name}`);

      for (let terminal of vscode.window.terminals) {
        terminal.sendText(`genv activate --id ${environment.eid}`);
      }

      context.subscriptions.push(vscode.window.onDidOpenTerminal(terminal => {
        terminal.sendText(`genv activate --id ${environment.eid}`);
      }));

      statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
      statusBarItem.command = 'genv.attach';
      statusBarItem.tooltip = 'This environment is not attached to any GPU';
      statusBarItem.text = 'No GPUs';
      statusBarItem.show();
      context.subscriptions.push(statusBarItem);

      vscode.commands.executeCommand('genv.envs.refresh');
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.config.gpus', async () => {
    if (environment.activated()) {
      const input: string | undefined = await vscode.window.showInputBox({
        placeHolder: 'Enter GPU count for the environment',
        validateInput: function(input: string): string | undefined {
          return /^([1-9]\d*)?$/.test(input) ? undefined : 'Must be an integer grather than 0';
        }
      });

      if (input) {
        const gpus: number = parseInt(input);

        await environment.configGPUs(gpus);

        for (let terminal of vscode.window.terminals) {
          terminal.sendText('genv config gpus --refresh');
        }

        // TODO(raz): should we reattach here or at least suggest it to the user?
      }
    } else {
      vscode.window.showErrorMessage('Not running in an activated GPU environment');
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.config.name', async () => {
    if (environment.activated()) {
      const name: string | undefined = await vscode.window.showInputBox({
        placeHolder: 'Enter name for the environment',
      });

      if (name) {
        await environment.configName(name);

        for (let terminal of vscode.window.terminals) {
          terminal.sendText('genv config name --refresh');
        }
      }
    } else {
      vscode.window.showErrorMessage('Not running in an activated GPU environment');
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.attach', async () => {
    if (!environment.activated()) {
      await vscode.commands.executeCommand('genv.activate');
    }

    if (environment.activated()) {
      if (environment.config().gpus === undefined) {
        await vscode.commands.executeCommand('genv.config.gpus');
      }

      if (environment.config().gpus) {
        await environment.attach();

        for (let terminal of vscode.window.terminals) {
          terminal.sendText('genv attach --refresh');
        }

        statusBarItem.text = environment.config().gpus === 1 ? '1 GPU' : `${environment.config().gpus} GPUs`;
        statusBarItem.tooltip = `This environment is attached to ${statusBarItem.text} at ${environment.indices()}`;
        statusBarItem.command = undefined;

        vscode.commands.executeCommand('genv.devices.refresh');
      }
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.detach', async () => {
    if (environment.activated()) {
      if (environment.attacahed()) {
        await environment.detach();

        for (let terminal of vscode.window.terminals) {
          terminal.sendText('genv attach --refresh');
        }

        statusBarItem.command = 'genv.attach';
        statusBarItem.tooltip = 'This environment is not attached to any GPU';
        statusBarItem.text = 'No GPUs';

        vscode.commands.executeCommand('genv.devices.refresh');
      }
    } else {
      vscode.window.showWarningMessage('Not running in an activated GPU environment');
    }
  }));
}
