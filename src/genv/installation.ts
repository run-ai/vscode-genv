import * as cp from '../utils/cp';

export async function installed(): Promise<boolean> {
  try {
    await cp.exec("genv")
  } catch {
    return false;
  }

  return true;
}

export function initTerminalCommands(): string[] {
  return [
    'eval "$(genv shell --init)"',
  ];
}

export async function install() {
  await cp.exec('pip install genv');

  for (let command of initTerminalCommands()) {
    await cp.exec(`echo '${command}' >> ~/.bashrc`);
  }
}
