const { fetch } = require('./markets')
const { savePrice } = require('./graphql')

let savedMarket = {}

const from = 'USDC'
const to = 'DAI'

setInterval(async function () {
  const market = await fetch(from, to)

  console.log(`market : ${JSON.stringify(market, null, 2)}`)

  if (market.price !== savedMarket.price) {
    savedMarket = market
    const savedPrice = await savePrice(from, to, market.price)
    if (savedPrice.data.insert_prices.affected_rows === 1) {
      console.log(
        `Saved new price, market at ${new Date()} :  : ${JSON.stringify(
          market,
          null,
          2
        )}`
      )
    }
  } else {
    console.log('.')
  }
}, 10000)
