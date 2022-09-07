import * as vscode from 'vscode';
import * as environment from './environment';
import { DevicesProvider } from './provider/devices';
import { EnvProvider } from './provider/env';
import { EnvsProvider } from './provider/envs';

let statusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  context.subscriptions.push(statusBarItem);

  const envProvider = new EnvProvider();

  context.subscriptions.push(vscode.window.registerTreeDataProvider('genv.env', envProvider));
  context.subscriptions.push(vscode.commands.registerCommand('genv.env.refresh', () => {
    envProvider.refresh();

    if (environment.attacahed()) {
      statusBarItem.text = environment.config().gpus === 1 ? '1 GPU' : `${environment.config().gpus} GPUs`;
      statusBarItem.tooltip = `Environment is attached to ${statusBarItem.text} at ${environment.indices()}`;
      statusBarItem.command = { title: 'Reattach', command: 'genv.attach', arguments: [true] };
    } else {
      statusBarItem.command = 'genv.attach';
      statusBarItem.tooltip = 'Environment is not attached to any GPU';
      statusBarItem.text = 'No GPUs';
    }
}));

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
        terminal.sendText(`genv activate --id ${environment.eid} --no-load --no-attach --no-prompt`);
      }

      context.subscriptions.push(vscode.window.onDidOpenTerminal(terminal => {
        terminal.sendText(`genv activate --id ${environment.eid} --no-load --no-attach --no-prompt`);
      }));

      statusBarItem.show();

      vscode.commands.executeCommand('genv.env.refresh');
      vscode.commands.executeCommand('genv.envs.refresh');
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.config.gpus', async () => {
    if (environment.activated()) {
      const input: string | undefined = await vscode.window.showInputBox({
        placeHolder: 'Enter GPU count for the environment',
        value: environment.config().gpus ? `${environment.config().gpus}` : undefined,
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

        vscode.commands.executeCommand('genv.env.refresh');

        if (environment.attacahed()) {
          vscode.commands.executeCommand('genv.attach');
        }
      }
    } else {
      vscode.window.showErrorMessage('Not running in an activated GPU environment');
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.config.name', async () => {
    if (environment.activated()) {
      const name: string | undefined = await vscode.window.showInputBox({
        placeHolder: 'Enter name for the environment',
        value: environment.config().name,
      });

      if (name) {
        await environment.configName(name);

        for (let terminal of vscode.window.terminals) {
          terminal.sendText('genv config name --refresh');
        }

        vscode.commands.executeCommand('genv.env.refresh');
        vscode.commands.executeCommand('genv.envs.refresh');
      }
    } else {
      vscode.window.showErrorMessage('Not running in an activated GPU environment');
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.attach', async (reconfig: boolean=false) => {
    if (!environment.activated()) {
      await vscode.commands.executeCommand('genv.activate');
    }

    if (environment.activated()) {
      if (reconfig || environment.config().gpus === undefined) {
        await vscode.commands.executeCommand('genv.config.gpus');
      }

      if (environment.config().gpus) {

        try {
          await environment.attach();
        } catch (error: any) {
          vscode.window.showErrorMessage(`${error.stderr}`);
          return;
        }

        for (let terminal of vscode.window.terminals) {
          terminal.sendText('genv attach --refresh');
        }

        vscode.commands.executeCommand('genv.env.refresh');
        vscode.commands.executeCommand('genv.devices.refresh');
      }
    }
  }));

  context.subscriptions.push(vscode.commands.registerCommand('genv.detach', async () => {
    if (environment.activated()) {
      if (environment.attacahed()) {
        if (await vscode.window.showQuickPick(['No', 'Yes'], { placeHolder: 'Are you sure you want to detach the environment from GPUs?' }) === 'Yes') {
          await environment.detach();

          for (let terminal of vscode.window.terminals) {
            terminal.sendText('genv attach --refresh');
          }

          vscode.commands.executeCommand('genv.env.refresh');
          vscode.commands.executeCommand('genv.devices.refresh');
        }
      }
    } else {
      vscode.window.showWarningMessage('Not running in an activated GPU environment');
    }
  }));
}
