const axios = require('axios')

async function getPrice (from, to) {
  const priceUrlBase = process.env.PRICE_BASE_URL
    ? process.env.PRICE_BASE_URL
    : `https://api.1inch.exchange`

  const priceUrl = `${priceUrlBase}v1.1/quote?fromTokenSymbol=${from}&toTokenSymbol=${to}&amount=1&disabledExchangesList=Bancor`

  let response = await axios.get(priceUrl)

  const { toTokenAmount } = response.data

  return toTokenAmount
}

module.exports = {
  getPrice
}
