const axios = require('axios')

async function getPrice (from, to) {
  try {
    const priceUrlBase = process.env.PRICE_BASE_URL
      ? process.env.PRICE_BASE_URL
      : 'https://api.1inch.exchange/'

    //const priceUrlBase = 'https://api.1inch.exchange/'

    const priceUrl = `${priceUrlBase}v1.1/quote?fromTokenSymbol=${from}&toTokenSymbol=${to}&amount=1&disabledExchangesList=Bancor`

    console.log(`priceUrl ---> : ${priceUrl}`)
    const response = await axios.get(priceUrl)

    console.log(`response : ${JSON.stringify(response, null, 2)}`)

    const { toTokenAmount } = response.data
  } catch (error) {
    console.log(`error : ${JSON.stringify(error, null, 2)}`)
    //console.log(`priceUrl ---> : ${priceUrl}`)
    process.exit()
    toTokenAmount = 0
  }

  return toTokenAmount
}

module.exports = {
  getPrice
}
