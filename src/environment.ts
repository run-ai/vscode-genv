import * as control from './control';

export var eid: number | undefined;
export var gpus: number | undefined;

export function activated(): boolean {
	return eid !== undefined;
}

export function activate() {
	eid = process.pid;

	control.sendText(`genv activate --id ${eid}`);
}

export function configName(name: string) {
	control.sendText(`genv config name ${name}`);
}

export function configGPUs(value: number) {
	gpus = value;
	control.sendText(`genv config gpus ${gpus}`);
}

export function attach() {
	control.sendText('genv attach');
}
