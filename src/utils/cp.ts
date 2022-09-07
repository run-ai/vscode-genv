import * as cp from 'child_process';
import { promisify } from 'util';

export async function exec(command: string, trim: boolean=true): Promise<string> {
  let { stdout } = await promisify(cp.exec)(command);

  if (trim) {
    stdout = stdout.trim();
  }

  return stdout;
}
