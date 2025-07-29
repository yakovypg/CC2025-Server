# Deployment

This document provides instructions for deploying the application in a production environment.

## Table Of Contents

*    [Environment Variables](#environment-variables)
*    [Certificates](#certificates)
*    [Docker](#docker)
     *    [Start](#start)
     *    [Stop](#stop)

## Environment Variables

Before you start deploying, create a `.env.production` or `.env.development` file using the provided templates, depending on whether you are deploying in a production or development environment

## Certificates

The server is running over HTTPS, so you need to create certificates for it to function correctly. You can do this using the [generate.sh](../certificates/generate.sh) script or by another method, but the resulting files, `server.cert` and `server.key`, must be placed in the `certificates` folder.

## Docker

We assume that the following commands are used to test a production-ready server; therefore, `.env.production` and `docker-compose-production.yml` are utilized. However, you can easily switch to `.env.development` and `docker-compose-development.yml` for development purposes.

### Start
You can easily deploy the server using the following command.

```bash
docker compose -f docker-compose-production.yml --env-file .env.production up -d --build
```

This command will build the Docker images and start the containers in detached mode. The `--build` flag ensures that the images are rebuilt if there are any changes in the Dockerfile or the application code.

### Stop

To stop the server, you can use the command below.

```bash
docker compose -f docker-compose-production.yml down
```

This command will stop and remove the containers defined in the `docker-compose-production.yml` file.

You can also use the `-v` option to delete all volumes and corresponding data, which is useful for cleaning up after testing or if you want to reset the state of your application.

```bash
docker compose -f docker-compose-production.yml down -v
```
