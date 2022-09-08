import * as vscode from 'vscode';
import * as envs from '../genv/envs';

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
  constructor(env: envs.Env) {
    super(`${env.eid}`);
    this.description = `${env.user}`;
    if (env.name) {
      this.description = `${env.name} ${this.description}`;
    }
    this.tooltip = `Created ${env.created!.format('MMM D, YYYY hh:mm:ss')}`;
  }
}
