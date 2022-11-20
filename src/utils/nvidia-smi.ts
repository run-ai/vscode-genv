import * as cp from './cp';

export async function query(field: string): Promise<string> {
  return await cp.exec(`nvidia-smi --query | grep '${field}' | sed -r 's/^${field}.*: (\\S*)/\\1/g'`);
}

export async function cudaVersion(): Promise<string> {
  return await query("CUDA Version");
}

export async function driverVersion(): Promise<string> {
  return await query("Driver Version");
}

export async function deviceCount(): Promise<string> {
  return await query("Attached GPUs");
}
