# Development

This document provides useful information for developers to enhance the project.

## Table Of Contents

*    [Quick Start](#quick-start)
     *    [Build](#build)
     *    [Test](#test)
     *    [Start](#start)
*    [HTTPS](#https)
*    [Scripts](#scripts)
*    [Change Initial Cards](#change-initial-cards)
*    [VS Code Configuration](#vs-code-configuration)

## Quick Start

Before you start using the server, you should create certificates and files with environment variables. You can read more about this in the corresponding part of the [documentation](Deployment.md). You can create all necessary files using the [configure.sh](../configure.sh) script or do everything manually. However, in any case, ensure that all variable values align with your requirements. Please note that if you want to use our script, `openssl`, `sed`, `bash`, `cp`, and `cd` must be installed on your system.

You should also execute the `yarn init` command if you are going to start the server for the first time.

### Build

You can build the server using the following command.

```bash
yarn build
```

You can specify the release or debug configuration using the `:debug` and `:release` postfixes. For example, as shown in the command below.

```bash
yarn build:release
```

### Test

You can execute tests using the following command.

```bash
yarn test
```

### Start

You can start the server using the following command.

```bash
yarn start
```

You can specify the release or debug configuration using the `:debug` and `:release` postfixes. For example, as shown in the command below.

```bash
yarn start:release
```

You can also use the `serve` script to run the built files, as shown in the command below.

```bash
yarn serve
```

## HTTPS

If you are running a server not on `localhost` and plan to use it with a VK mini application, please note that the server must be operated over HTTPS.

It should be noted that, by default, the server configuration script generates a self-signed certificate for HTTPS. This certificate allows you to test the server's functionality locally by disabling certificate verification in the browser or by adding the generated certificate to the trusted list. However, a self-signed certificate is not suitable for production use. Instead, you should purchase a domain name, obtain a certificate for it, and provide it to the server by placing the `.key` and `.cert` files in the `certificates` folder. This ensures that your server operates securely and is trusted by clients accessing it over HTTPS.

## Scripts

You can utilize the scripts included in the `package.json` file to work efficiently with the server and its code. For example, you can run `yarn format` to format all source files or `yarn build:debug` to build the server in debug mode.

## Change Initial Cards

You can easily modify the initial cards by editing the [cards-ru.json](../scripts/mongo-init/cards-ru.json) file. Please note that if you have already started the database, you will need to remove the corresponding Docker volume to properly initialize the database.

## VS Code Configuration

You can debug the server in Visual Studio Code using the following `launch.json` configuration file.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run and debug server",
      "runtimeArgs": [
        "--inspect"
      ],
      "args": [
        "-r",
        "ts-node/register",
        "src/index.ts"
      ],
      "cwd": "${workspaceFolder}",
      "sourceMaps": true,
      "outFiles": [
        "${workspaceFolder}/**/*.js"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "env": {
        "IS_DEBUG": "true",
        "NODE_ENV": "development"
      }
    }
  ]
}
```
