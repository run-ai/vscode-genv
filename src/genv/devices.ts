import * as control from './control';

function exec(command: string): Promise<string> {
  return control.exec(`exec devices ${command}`);
}

export async function attach(eid: number, count: number): Promise<string> {
  return await exec(`attach --eid ${eid} --count ${count}`);
}
