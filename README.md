# GPU Environment Management for Visual Studio Code [![Join the community at https://join.slack.com/t/genvcommunity/shared_invite/zt-1i70tphdc-DmFgK5yr3HFI8Txx1yFXBw](https://img.shields.io/badge/Slack-genv-ff007f?logo=slack)](https://join.slack.com/t/genvcommunity/shared_invite/zt-1i70tphdc-DmFgK5yr3HFI8Txx1yFXBw) [![Join the chat at https://gitter.im/run-ai-genv/community](https://badges.gitter.im/run-ai-genv/community.svg)](https://gitter.im/run-ai-genv/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


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

## 🏃🏻 Be an early runner in the genv community!

[<img src="https://img.shields.io/badge/Slack-Join%20the%20community!-ff007f?style=for-the-badge&logo=slack&logoColor=ff007f" height="30" />](https://join.slack.com/t/genvcommunity/shared_invite/zt-1i70tphdc-DmFgK5yr3HFI8Txx1yFXBw)

Join our Slack channel with the creators of *genv* and start building your models faster!

- Installation and setup support as well as best practice tips and tricks directly for your use-case
- Discuss possible features
- Monthly coffee breaks to get to know the rest of the community

Looking forward to seeing you as a part of the community!

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
