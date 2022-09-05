import * as control from './control';

function exec(command: string): Promise<string> {
  return control.exec(`exec envs ${command}`);
}

export async function activate(pid: number, eid: number, uid: number, username: string): Promise<void> {
  await exec(`activate --pid ${pid} --eid ${eid} --uid ${uid} --username ${username}`);
}

export async function configName(eid: number, name: string): Promise<void> {
  await exec(`config --eid ${eid} name --name "${name}"`);
}

export async function configGPUs(eid: number, count: number): Promise<void> {
  await exec(`config --eid ${eid} gpus --count ${count}`);
}
