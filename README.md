# GPU Environment Management for Visual Studio Code

The [_genv_](https://github.com/run-ai/genv) extension lets you interactively control, configure and monitor the GPU resources that your Visual Studio Code session is using.

With _genv_ you could:
* Easily share GPUs with your teammates.
* Find available GPUs for you to use.
* Switch between GPUs without code changes.

![Overview](/resources/readme/overview.gif)

## Getting Started
Read the _genv_ [reference](https://github.com/run-ai/genv#usage) to get started.

## Features
### Setting the Device Count
You can configure how many GPUs you need just by clicking the status bar item.
After specifying the device count, _genv_ will look for available GPUs and attach them for your environment.

From now on, anything you'll run in your Visual Studio Code session would use only these GPUs (e.g. Python scripts, terminal commands, etc.).
You will also see the devices turn green which shows that they are attached to your environment.

![Device Count](/resources/readme/statusbar.gif)

### Choosing Specific GPUs to Use
In addition to automatically provisioning GPUs based on the configured device count, _genv_ lets you choose specific GPUs that you want your environment to use.
You can switch between GPUs easily by selecting them in the device view.

![Choose GPUs](/resources/readme/selectdevices.gif)
