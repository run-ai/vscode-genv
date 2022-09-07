import * as installation from './installation';
import * as cp from '../utils/cp';

export async function exec(command: string, trim: boolean=true): Promise<string> {
  return await cp.exec(`${installation.root()}/bin/genv ${command}`, trim);
}
