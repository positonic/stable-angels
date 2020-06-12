const { worthMoreThanDai, percentageDifferenceWithDai } = require('./utils')
const { getPrice } = require('./price')

async function fetch (from, to) {
  const price = await getPrice(from, to)

  const market = {}
  market.from = from
  market.to = to
  market.price = price

  market.difference = price - 1000000000000
  market.differenceFormatted =
    market.difference > 0
      ? market.difference.toString().padStart(12, '0')
      : '-' + (market.difference * -1).toString().padStart(12, '0')
  market.percentageDifference = percentageDifferenceWithDai(market.difference)

  if (worthMoreThanDai(price)) {
    market.mostValuable = worthMoreThanDai(price) ? from : to
  }
  return market
}

async function fetchMarkets (markets) {
  return await Promise.all(
    markets.map(async market => await fetch(market.from, market.to))
  )
}

module.exports = {
  fetch,
  fetchMarkets
}
