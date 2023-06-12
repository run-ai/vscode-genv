import * as cp from '../utils/cp';

export async function exec(command: string, trim: boolean=true): Promise<string> {
  return await cp.exec(`genv ${command}`, trim);
}
