Help make DAI stable, and get rich quick!

Check prices:

To start run `npm start`

This will lead you through an onboarding if you havent aleady set up your accounts yet.

It uses the state.json file for state and persistance because I didn't want to introduce any database or other dependencies yet.

When you run `npm start` it will check to see if you have initialised the app by checking the value of 'initalised' in state.json, if not it will hold your hand while setting up your smart accounts.

You will need an owner account and it's private key. I created a new address in [metamask](https://metamask.io/) for this purpose.

### Save your prices:

[![Deploy a new graphql server to Heroku in 30 seconds](https://camo.githubusercontent.com/83b0e95b38892b49184e07ad572c94c8038323fb/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e737667)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

Paste the url of your GraphQL server into your .env file labelled as GRAPHQL_ENDPOINT

[Create your database tables like this](https://github.com/jamespfarrell/stable-angels/issues/1)
Tests the connection to the GraphQL server
Run `node graphql`

### Works in progress:

Saves checks prices and puts them in the console:
Run `node prices`

Haura:
Create env variable HASURA_GRAPHQL_UNAUTHORIZED_ROLE and add it to your .env file
[Unauthenticated access](https://hasura.io/docs/1.0/graphql/manual/auth/authentication/unauthenticated-access.html)
