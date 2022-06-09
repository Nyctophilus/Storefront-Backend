# Storefront-Backend

Storefront Backend Udacity nanodegree Project

## Storefront Backend Project

## Overview

Storefront Backend Project

#### Techs

- PostgreSQL
- NodeJS
- Express
- Typescript
- Jasmine

#### How to use

- initailize the project.
  `npm install`
  `npm start`

- Initialize PostgreSQL
  `psql -h localhost -U postgres`

- create database for dev env
  `CREATE DATABASE storefront`

- connect to database
  `\c storefront`

- show tables
  `\dt`

- disconnect from database
  `\q`

#### Migration script for test-db

`npm run test`

#### Migration script for dev-db

`npm run dev`

### Environment Variables

#### default env

`ENV=dev`

#### PostgreSQL dev db

`POSTGRES_HOST=127.0.0.1`
`POSTGRES_DB=storefront`
`POSTGRES_USER=postgres`
`POSTGRES_PASSWORD=1234`

#### testing db

`POSTGRES_TEST_DB=storefront_test`

#### password encryption

`BCRYPT_SALT_ROUNDS=10`

`BCRYPT_PEPPER=123xcxzc@af023aaX#`

#### JWT

`JWT_TOKEN_SECRET=sl2X@*asclo*2`
