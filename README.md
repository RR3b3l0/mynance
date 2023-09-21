# Mynance

Mynance is an project used to learn Monorepos using Turborepo.

It contains an app + web (next js react) + node.js server.

Both app and web share components located on the package @mynance/shared-ui


## Setup

- Have a postgresql server running locally or remote and change the .env (SERVER_DATABASE_URL)
- On the root of the project just run `yarn` to install the packages
- On `apps/server` run `npx prisma db push` to initialize the db

## Run the project
To run the project it's just running the command `yarn dev` on the root.

## Available scripts
- `yarn dev` - to run locally the apps
- `yarn build` - to build the apps
- `yarn pod install` - to install ios pods