require('dotenv').config()
const { transactionLink } = require('./terminal')
const colors = require('colors')

// in nodejs
const Web3 = require('web3')
const DSA = require('dsa-sdk')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE_URL))

// in nodejs
const dsa = new DSA({
  web3: web3,
  mode: 'node',
  privateKey: process.env.PRIVATE_KEY
})

module.exports = {
  dsa
}
