import * as vscode from 'vscode';
import * as envs from '../genv/envs';
import * as env from '../genv/env';

export class Provider implements vscode.TreeDataProvider<Env> {
  getTreeItem(element: Env): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Env): Thenable<Env[]> {
    if (element) {
        return Promise.resolve([]);
    } else {
        return Promise.resolve(this.getEnvs());
    }
  }

  private async getEnvs(): Promise<Env[]> {
    return (await envs.ps()).map(env => new Env(env));
  }

  private _onDidChangeTreeData: vscode.EventEmitter<Env | undefined | null | void> = new vscode.EventEmitter<Env | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Env | undefined | null | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class Env extends vscode.TreeItem {
  constructor(e: envs.Env) {
    super(e.name ? `${e.eid} (${e.name})` : `${e.eid}`);
    this.description = `${e.user}`;
    this.tooltip = `Created ${e.created!.format('MMM D, YYYY hh:mm:ss')}`;

    if (e.eid === env.eid) {
      this.iconPath = new vscode.ThemeIcon('play', new vscode.ThemeColor('debugIcon.startForeground'));
    }
  }
}
