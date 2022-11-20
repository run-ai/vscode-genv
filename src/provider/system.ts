import * as vscode from 'vscode';
import * as nvidia_smi from '../utils/nvidia-smi';

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

  private async getInfoItems(): Promise<vscode.TreeItem[]> {
    return [
      {
        label: `CUDA Version: ${await nvidia_smi.cudaVersion()}`,
      },
      {
        label: `Driver Version: ${await nvidia_smi.driverVersion()}`,
        // TODO(raz): show an 'info' icon when not latest version
      },
      {
        label: `Device Count: ${await nvidia_smi.deviceCount()} GPUs`,
        tooltip: await nvidia_smi.productName(),
      },
    ];
  }

  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
