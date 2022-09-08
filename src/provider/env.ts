import * as vscode from 'vscode';
import * as environment from '../genv/env';

export class Provider implements vscode.TreeDataProvider<vscode.TreeItem> {
	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
		if (element) {
			return Promise.resolve([]);
		} else {
			return Promise.resolve(this.getInfoItems());
		}
	}

	private getInfoItems(): vscode.TreeItem[] {
		if (environment.activated()) {
			return [
        {
          label: 'Name',
          description: environment.config().name,
          contextValue: 'name'
        },
        {
          label: 'Device Count',
          description: environment.config().gpus ? `${environment.config().gpus}` : undefined,
          contextValue: 'gpus',
        },
        environment.attacahed() ? {
          label: 'Attached',
          description: `to devices ${environment.indices()}`,
          contextValue: 'attached',
        } : {
          label: 'Detached',
          contextValue: 'detached',
        },
      ];
		} else {
			return [];
		}
	}

	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}
