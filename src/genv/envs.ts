import * as control from './control';
import * as moment from 'moment';

export interface Env {
  eid: string;
  user: string;
  name?: string;
  created: moment.Moment;
  pids: number[];
}

function exec(command: string): Promise<string> {
  return control.exec(`envs ${command}`);
}

export async function activate(pid: number, eid: string, uid: number, username: string): Promise<void> {
  await exec(`activate --pid ${pid} --eid ${eid} --uid ${uid} --username ${username}`);
}

export async function configName(eid: string, name: string): Promise<void> {
  await exec(`config --eid ${eid} name --name "${name}"`);
}

export async function configGPUs(eid: string, count: number): Promise<void> {
  await exec(`config --eid ${eid} gpus --count ${count}`);
}

export async function ps(): Promise<Env[]>{
  const stdout = await exec("ps --format csv --no-header --timestamp");
  const lines = stdout.split('\n').filter(line => line.length > 0);

  return lines.map(line => {
    const [ eid, user, name, created, pids ] = line.split(',');
    return {
      eid: eid,
      user: user,
      name: name ? name : undefined,
      created: moment(created, 'DD/MM/YYYY hh:mm:ss'),
      pids: pids.split(' ').map(Number),
    };
  });
}
