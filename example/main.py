import os

CUDA_VISIBLE_DEVICES = os.environ.get("CUDA_VISIBLE_DEVICES")

if CUDA_VISIBLE_DEVICES is None:
    print('GPU environment is not activated')
    exit(1)
else:
    indices = [int(index) for index in CUDA_VISIBLE_DEVICES.split(',')]

    if indices == [-1]:
        print('No GPUs attached')
        exit(1)
    else:
        print(f'{len(indices)} GPUs are attached at indices {",".join(str(index) for index in indices)}')
