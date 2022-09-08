import * as vscode from 'vscode';
import * as installation from './commands/installation';
import * as env from './commands/env';
import * as envs from './commands/envs';
import * as devices from './commands/devices';

export async function activate(context: vscode.ExtensionContext) {
  installation.init(context);
  env.init(context);
  envs.init(context);
  devices.init(context);
}
