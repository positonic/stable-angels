const { fetch } = require('./markets')
let savedMarket = {}

setInterval(async function () {
  market = await fetch('USDC', 'DAI')
  if (market.price !== savedMarket.price) {
    console.log(`market at ${new Date()} : ${JSON.stringify(market, null, 2)}`)
    savedMarket = market
  } else {
    console.log('.')
  }
}, 10000)
