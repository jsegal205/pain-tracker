# Pain Tracker site

React / Node app to help log pain symptoms to provide more data to my doctors about what I'm going through so that they can sus out patterns or causes.

## Run locally

### Install deps

```bash
yarn
```

### Start Server and React app

```bash
yarn dev
```

The local server runs the node server on port 3030 by default and the react server on port 3000

### Google Sheet

Create a google sheets and have two tabs

#### First tab header row:

> | name | symptoms | notes | time |
> | ---- | -------- | ----- | ---- |

Lowercase headers are important

#### Second tab header row:

> | name | symptoms |
> | ---- | -------- |

Lowercase headers are important

### .env

Create a .env file

```bash
touch .env
```

Add the following items to it with values

[Read more about setting up a Google Service level user](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=authentication)

[Read more about Google Spreadsheet dependency](https://www.npmjs.com/package//google-spreadsheet)

```
GOOGLE_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
```

## Deployment

If you are to build and deploy this (say to Heroku), the set up will get all the dependencies, build the react code to the /build directory and then serve those files from the node server.
