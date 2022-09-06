import * as control from './control';
import * as moment from 'moment';

export interface Env {
  eid: number;
  user: string;
  name?: string;
  created: moment.Moment;
  pids: number[];
}

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

export async function ps(): Promise<Env[]>{
  const stdout = await exec("ps --format csv --no-header --timestamp");
  const lines = stdout.split('\n');

  return lines.map(line => {
    const [ eid, user, name, created, pids ] = line.split(',');
    return {
      eid: Number(eid),
      user: user,
      name: name ? name : undefined,
      created: moment(created, 'DD/MM/YYYY hh:mm:ss'),
      pids: pids.split(' ').map(Number),
    };
  });
}
