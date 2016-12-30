# Express Server

Server for building API

## Principles

First, see doc in core/. This server implement classical mvc-web pattern with express, knex and bookshelf orm.

## Installation

git clone this repo then run npm install.

### Config file
In config/config.js file.
```javascript
export const config = {
  development: {
    app: {
      // port the node instance listening
      port: 3010,
      // concerning the json web token
      // for auth users
      token: {
        secret: "secret",
        expire: 84000
      }
    },
    database: {
      host: "127.0.0.1",
      port: "5432",
      database: "test_db",
      user: "test",
      password: "test"
    }
  }
}
```
In config/config-orm.js file, search for const params.
```javascript
export const params = {
  // You need one of the following:
  // npm install pg
  // npm install mysql
  // npm install mariasql
  // npm install sqlite3
  client: 'pg',
  connection: dbConnection
};
```

### Build a package

See user and experiment package in app/. Original idea based on symfony packages.
A package must have the following structure in app folder/. See ```user``` for example.
```
app/
  |__ packageName
    |__ packageName.js
    |__ model/
    |__ controller/
    |__ schema/
```

## Run

Run ```gulp build:dev``` and ```gulp run:dev``` to run the development application.
Run ```gulp build``` for the production build then ```node dist/server.js```.