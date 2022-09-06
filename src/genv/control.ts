import * as cp from 'child_process';
import { promisify } from 'util';

// TODO(raz): support other installation paths
const root: string = "$HOME/genv";

export async function exec(command: string, trim: boolean=true): Promise<string> {
  let { stdout } = await promisify(cp.exec)(`${root}/bin/genv ${command}`);

  if (trim) {
    stdout = stdout.trim();
  }

  return stdout;
}
