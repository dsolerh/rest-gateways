# Gateway Management API

## Description

This project is a REST-API for managing gateways (master devices that control multiple peripheral devices). Implemented using express.js and mongoose.js

## Installation

```bash
# with npm (recomended)
$ npm i 
```

## Testing the app

```bash
# all the tests
$ npm run test

# specific ones
$ npm run test name-of-the-test
```

## Running the app

```bash
# development | prod
$ npm run start

# generate the docs and start the app
$ npm run g:docs
```

## MongoDB setup

There is no difference on whether to use mongo locally or in a docker container, for both cases the mongo service must be running.

## Container setup

```bash
# (on linux or mac)

# this start the service on the background
$ sudo docker-composer up -d

# this start the service directly on the terminal
$ sudo docker-composer up
```
