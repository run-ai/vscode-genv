import * as os from 'os';
import * as devices from './genv/devices';
import * as envs from './genv/envs';

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

export const eid: number = process.pid;

export function activated(): boolean {
	return state.activated;
}

export function config(): Config {
  return state.config;
}

export function indices(): number[] {
	return state.indices;
}

// TODO(raz): support deactivating
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

// TODO(raz): support detaching
export async function attach() {
  if (state.config.gpus) {
    const stdout = await devices.attach(eid, state.config.gpus);
	  state.indices = stdout.trim().split(',').map(Number);
  }
}
