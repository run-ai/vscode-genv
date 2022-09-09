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
          label: environment.config().name,
          contextValue: 'name',
		  iconPath: new vscode.ThemeIcon('megaphone'),
        },
        environment.attached() ? {
          label: 'Attached',
          description: `to devices ${environment.indices()}`,
          contextValue: 'attached',
		  iconPath: new vscode.ThemeIcon('check', new vscode.ThemeColor('debugIcon.startForeground')),
        } : {
          label: 'Detached',
          contextValue: 'detached',
		  iconPath: new vscode.ThemeIcon('debug-pause', new vscode.ThemeColor('debugIcon.stopForeground')),
		  command: {
			"title": "Attach Environment to Devices",
			"command": "genv.env.attach"
		  }
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
