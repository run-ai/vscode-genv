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
          tooltip: 'Click to configure the environment name',
          command: {
            title: 'Configure Environment Name',
            command: 'genv.env.config.name',
          },
        },
        {
          label: 'Device Count',
          description: environment.config().gpus ? `${environment.config().gpus}` : undefined,
          tooltip: 'Click to configure the environment device count',
          command: {
            title: 'Configure Environment Device Count',
            command: 'genv.env.config.gpus',
          },
        },
        environment.attacahed() ? {
          label: 'Attached',
          description: `Using devices ${environment.indices()}`,
          tooltip: 'Click to detach the environment',
          command: {
            title: 'Detach Environment',
            command: 'genv.env.detach',
          },
        } : {
          label: 'Detached',
          tooltip: 'Click to attach the environment',
          command: {
            title: 'Attach Environment',
            command: 'genv.env.attach',
          },
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
