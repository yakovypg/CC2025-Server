<h1 align="center">CC2025-Server</h1>
<p align="center">
  <img alt="CC2025-Server" height="200" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW9ydGhsaXhhZW9zOW1qeWtyc2sxbmUyb3Fwa3JzM2swb2xxMmpueSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xiOgHgY2ceKhm46cAj/giphy.gif" />
</p>

<p align="center">
  <a href="https://github.com/yakovypg/CC2025-Server/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-darkyellow.svg" alt="license" />
  </a>
  <img src="https://img.shields.io/badge/Version-1.0.0-red.svg" alt="version" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue" alt="typescript" />
</p>

## About
**CC2025-Server** is a server for the [CC2025](https://github.com/yakovypg/CC2025).

[![Contributors](https://img.shields.io/github/contributors/yakovypg/CC2025-Server)](https://github.com/yakovypg/CC2025-Server/graphs/contributors)
[![Build Status](https://img.shields.io/github/actions/workflow/status/yakovypg/CC2025-Server/tsserver.yml?branch=main)](https://github.com/yakovypg/CC2025-Server/actions/workflows/tsserver.yml?query=branch%3Amain)

## Table of contents
*    [Quick Start](#quick-start)
*    [Documentation](#documentation)
*    [Contributing](#contributing)
*    [License](#license)

## Quick Start

First, ensure that `openssl`, `sed`, `bash`, `cp`, and `cd` are installed on your system. These utilities are used in the [configure.sh](./configure.sh) script, which creates certificates and files with environment variables. If you prefer not to install these utilities, you can manually create the necessary files and skip the first step described below.

The easiest way to start the server is presented in the following steps:
1. Configure the project using `bash ./configure.sh`.
2. Initialize the packages with `yarn init`.
3. Build and run the Docker containers using `docker compose -f docker-compose-production.yml --env-file .env-production up -d --build`.

After these steps, the server should be available on your host at port `8080`.

## Documentation

You can read our documentation in the [DOCUMENTATION.md](DOCUMENTATION.md).

## Contributing

Contributions are welcome, have a look at the [CONTRIBUTING.md](CONTRIBUTING.md) document for more information.

## License

The project is available under the [MIT](LICENSE) license.
