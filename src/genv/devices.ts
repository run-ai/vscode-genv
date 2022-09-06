import * as control from './control';
import * as moment from 'moment';

export interface Device {
  id: number;
  eid?: number;
  envName?: string;
  attached?: moment.Moment;
}

function exec(command: string): Promise<string> {
  return control.exec(`exec devices ${command}`);
}

export async function attach(eid: number, count: number): Promise<string> {
  return await exec(`attach --eid ${eid} --count ${count}`);
}

export async function ps(): Promise<Device[]>{
  const stdout = await exec("ps --format csv --no-header --timestamp");
  const lines = stdout.split('\n');

  return lines.map(line => {
    const [ id, eid, envName, attached ] = line.split(',');
    return {
      id: Number(id),
      eid: eid ? Number(eid) : undefined,
      envName: envName ? envName : undefined,
      attached: attached ? moment(attached, 'DD/MM/YYYY hh:mm:ss') : undefined,
    };
  });
}
