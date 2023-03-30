# GPU Environment Management for Visual Studio Code [![Join the community at (https://discord.gg/zN3Q9pQAuT)](https://img.shields.io/badge/Discord-genv-7289da?logo=discord)](https://discord.gg/zN3Q9pQAuT) 

[<img src="https://img.shields.io/badge/Discord-Join%20the%20community!-7289da?style=for-the-badge&logo=discord&logoColor=7289da" height="30" />](https://discord.gg/zN3Q9pQAuT)

The [_genv_](https://github.com/run-ai/genv) extension lets you interactively control, configure and monitor the GPU resources that your Visual Studio Code session is using.

With _genv_ you could:
* Easily share GPUs with your teammates.
* Find available GPUs for you to use.
* Switch between GPUs without code changes.

![Overview](/resources/readme/overview.gif)

## Getting Started
Read the _genv_ [reference](https://github.com/run-ai/genv#usage) to get started.

## Installation
From the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=run-ai.vscode-genv).

## 🏃🏻 Join us in the AI Infrastructure Club!

[<img src="https://img.shields.io/badge/Discord-Join%20the%20community!-7289da?style=for-the-badge&logo=discord&logoColor=7289da" height="30" />](https://discord.gg/zN3Q9pQAuT)

Looking for a place to discuss best practices, discover new tools, and exchange ideas about how to make the most out of our GPUs without losing time? Join our Discord server with the creators of *genv* and [*rntop*](https://github.com/run-ai/rntop) - start building your models faster!

- Installation and setup support as well as best practice tips and tricks directly for your use-case
- Discuss possible features
- Monthly Beers with Engineers sessions with amazing guests
- Networking events 
- and many more...


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

## Development
### Publish
Bump the version.
You can use [`npm-version`](https://docs.npmjs.com/cli/v8/commands/npm-version).
For example:
```
npm version patch
```

Package the extension using:
```
npm run package
```

Publish the extension using:
```
npm run publish
```
