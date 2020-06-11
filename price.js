const axios = require('axios')

async function getPrice (from, to) {
  const priceUrlBase = process.env.PRICE_BASE_URL
    ? process.env.PRICE_BASE_URL
    : `https://api.1inch.exchange`

  let response = await axios.get(
    `${priceUrlBase}/v1.1/quote?fromTokenSymbol=${from}&toTokenSymbol=${to}&amount=1&disabledExchangesList=Bancor`
  )

  // console.log(`response.data : ${JSON.stringify(response.data, null, 2)}`)

  const { toTokenAmount } = response.data

  return toTokenAmount
}

module.exports = {
  getPrice
}
