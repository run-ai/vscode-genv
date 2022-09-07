import * as fs from 'fs';
import * as path from 'path';
import * as cp from '../utils/cp';

export function root(): string {
  return path.join(process.env.HOME!, 'genv');
}

export function installed(): boolean {
  return fs.existsSync(root());
}

export function initTerminalCommands(): string[] {
  return [
    `export PATH="${root()}/bin:$PATH"`,
    'eval "$(genv init -)"',
  ];
}

export async function install() {
  await cp.exec('git clone https://github.com/run-ai/genv.git ~/genv');

  for (let command of initTerminalCommands()) {
    await cp.exec(`echo '${command}' >> ~/.bashrc`);
  }
}
