import * as vscode from 'vscode';
import * as devices from '../genv/devices';

export class DevicesProvider implements vscode.TreeDataProvider<Device> {
  getTreeItem(element: Device): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Device): Thenable<Device[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(this.getDevices());
    }
  }

  private async getDevices(): Promise<Device[]> {
    return (await devices.ps()).map(device => new Device(device));
  }

  private _onDidChangeTreeData: vscode.EventEmitter<Device | undefined | null | void> = new vscode.EventEmitter<Device | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Device | undefined | null | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class Device extends vscode.TreeItem {
  constructor(device: devices.Device) {
    super(`GPU ${device.id}`);

    if (device.eid) {
      this.description = `${device.eid}`;
      this.tooltip = `Attached ${device.attached!.format('MMM D, YYYY hh:mm:ss')}`;
    }
  }
}
