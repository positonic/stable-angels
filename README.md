# Stable Angels

Let's all help make DAI stable, and get rich in the process!

![image of angles](https://images.yourstory.com/cs/wordpress/2019/01/Angels-2.png?fm=png&auto=format)

## Setup:

```
git clone git@github.com:jamespfarrell/stable-angels.git
npm i
```

Make a copy of state.example.json to state.json

Make a copy of .env.example to .env

1. You need an Ethereum node, if you don't have one [get one for free from Infura](https://infura.io/register). Get your app id and add it to ETH_NODE_URL

2. You need an ethereum wallet of some kind. Get your public addres and paste next to PUBLIC_ADDRESS in the .env

3. Get the private key of the address and put it in PRIVATE_KEY in .env

Once you have done this, we are ready to go:

## What we are going to do:

We are using Instadapp smart accounts in order to trade between different Ethereum based DeFi assets. In order to do so, we need an owner account (Ethereum wallet) and it's private key.

An easy way to set up an owner account is with [Metamask](https://metamask.io/), which means that when I go to the [Instadapp DSA dashboard](https://dsa.instadapp.io/), I can see the accounts I have created, and their balances.

With our owning ethereum address and private key, we can create instadapp smart account (DSA).

## Let's do that!

To start run `npm start`

This will lead you through an onboarding if you havent aleady set up your accounts yet.

It uses the state.json file for state and persistance because I didn't want to introduce any database or other dependencies yet.

When you run `npm start` it will check to see if you have initialised the app by checking the value of 'initialised' in state.json, if not it will hold your hand while setting up your smart accounts.

Then we need to get money into this new DSA. This isn't yet implemented, as so you need to do that yourself somehow. I did it with the Instadapp dashboard.

### Save your prices:

This is optional and for if you want to track prices, and figure out when you should be buying and selling things:

[![Deploy a new graphql server to Heroku in 30 seconds](https://camo.githubusercontent.com/83b0e95b38892b49184e07ad572c94c8038323fb/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e737667)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

Paste the url of your GraphQL server into your .env file labelled as GRAPHQL_ENDPOINT

[Create your database tables like this](https://github.com/jamespfarrell/stable-angels/issues/1)
Tests the connection to the GraphQL server
Run `node graphql`

### Works in progress:

Saves checks prices and puts them in the console:
Run `node getPrice`

Haura:
Create env variable HASURA_GRAPHQL_UNAUTHORIZED_ROLE and add it to your .env file
[Unauthenticated access](https://hasura.io/docs/1.0/graphql/manual/auth/authentication/unauthenticated-access.html)
