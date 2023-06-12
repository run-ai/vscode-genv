import * as vscode from 'vscode';
import * as installation from './commands/installation';
import * as env from './commands/env';
import * as envs from './commands/envs';
import * as devices from './commands/devices';
import * as system from './commands/system';

export async function activate(context: vscode.ExtensionContext) {
  await installation.init(context);
  env.init(context);
  envs.init(context);
  devices.init(context);
  system.init(context);

  // TODO(raz): make auto refresh configurable
  autoRefresh(context);
}

function autoRefresh(context: vscode.ExtensionContext) {
  let interval = setInterval(() => {
    vscode.commands.executeCommand('genv.envs.refresh');
    vscode.commands.executeCommand('genv.devices.refresh');
  }, 30000); // TODO(raz): make the refresh interval configurable

  // TODO(raz): is this correct? should we use 'dispose()' for this?
  context.subscriptions.push({ dispose() { clearInterval(interval); }});
}
