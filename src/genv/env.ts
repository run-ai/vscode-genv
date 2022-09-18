import * as os from 'os';
import * as devices from './devices';
import * as envs from './envs';

interface Config {
	gpus?: number;
	name?: string;
}

interface State {
	activated: boolean;
	config: Config;
	indices: number[];
}

let state: State = {
	activated: false,
	config: {},
	indices: [],
};

export const eid: string = `${process.pid}`;

export function activated(): boolean {
	return state.activated;
}

export function config(): Config {
  return state.config;
}

export function indices(): number[] {
	return state.indices;
}

export function attached(): boolean {
	return state.indices.length > 0;
}

export async function activate() {
	if (!state.activated) {
		const info = os.userInfo();
		await envs.activate(process.pid, eid, info.uid, info.username);
		state.activated = true;
	}
}

export async function configGPUs(count: number) {
	await envs.configGPUs(eid, count);
	state.config.gpus = count;
}

export async function configName(name: string) {
	await envs.configName(eid, name);
	state.config.name = name;
}

export async function attach() {
	if (state.config.gpus) {
		const stdout = await devices.attach(eid, state.config.gpus);
		state.indices = stdout.split(',').map(Number);
	}
}

export async function detach() {
	if (attached()) {
		await devices.detach(eid);
		state.indices = [];
	}
}

export async function attachDevice(index: number) {
	const stdout = await devices.attachDevice(eid, index);
	state.indices = stdout.split(',').map(Number);
}

export async function detachDevice(index: number) {
	const stdout = await devices.detachDevice(eid, index);

	if (stdout) {
		state.indices = stdout.split(',').map(Number);
	} else {
		state.indices = [];
	}
}
