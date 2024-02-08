# Taskphin

## NPM Commands

```shell
$ npm run <options>

OPTIONS:

start             -  Starts the production server

dev               -  Starts the development server

drizzle:studio    -  Run drizzle studio locally

drizzle:generate  -  Generate SQL migration statements

drizzle:push      -  Push local schema changes to database

drizzle:migrate   -  Apply generated SQL migration

```

## Setup

1. Install NodeJS: >= [v20.11.0](https://nodejs.org/en/), if you don't have it yet.

2. Install project dependencies: `npm install`

3. Start MySQL database: >=v8.0.30

4. Create `.env` file in root directory & configure values referring `.env.sample`

5. Run `npm run start` to start the app

## Database

1. Run `drizzle:generate` to generate migrations

2. Run `drizzle:migrate` to apply the migrations

## API Documentation

-   Postman Collection - [Taskphin](https://www.postman.com/arsadvc/workspace/taskphin/collection/29079331-f8bb64d1-092e-45c6-a16a-1f8ee5ba420e?action=share&creator=29079331)
