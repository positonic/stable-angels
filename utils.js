const axios = require('axios')

async function getCurrentGasPrices () {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json'
  )
  /// console.log(`response : ${JSON.stringify(response, null, 2)}`)

  const prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  }

  console.log('Current ETH Gas Prices (in GWEI):')
  console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`)
  console.log(
    `Standard: ${prices.medium} (transaction completes in < 5 minutes)`
  )
  console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`)
  return prices
}

function worthMoreThanDai (value) {
  const dai = 1000000000000
  if (value > dai) {
    return true
  }
  return false
}

function percentageDifference (low, high) {
  return (low / high) * 100
}

const daiValue = 1000000000000

function percentageDifferenceWith (subject) {
  return function (amount) {
    return (amount / subject) * 100
  }
}
const percentageDifferenceWithDai = percentageDifferenceWith(daiValue)

module.exports = {
  getCurrentGasPrices,
  worthMoreThanDai,
  percentageDifference,
  percentageDifferenceWithDai
}
