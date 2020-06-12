const vorpal = require('vorpal')()
require('dotenv').config()
const { dsa } = require('./dsa')
const { getPrice } = require('./price')
const { swap } = require('./swaps')
const { twirlTimer } = require('./animation')
const { getCurrentAccountId } = require('./accounts')
const { fetchMarkets } = require('./markets')

function init () {
  vorpal
    .command('accounts', 'List your smart accounts')
    .action(function (args, callback) {
      dsa.getAccounts(process.env.PUBLIC_ADDRESS).then(accounts => {
        accounts.forEach(account => {
          this.log(`${account.id} - ${account.address}`)
        })
      })

      callback()
    })
  vorpal
    .command('scan', 'Find opportunities')
    .action(async function (args, callback) {
      console.log('Scanning USDC / DAI market')
      const intervalId = twirlTimer()

      const markets = await fetchMarkets([
        {
          from: 'USDC',
          to: 'DAI'
        }
      ])
      clearInterval(intervalId)

      console.log(`markets : ${JSON.stringify(markets, null, 2)}`)

      markets.forEach(market =>
        console.log(
          `${market.from} to ${market.to} = ${market.percentageDifference}% difference`
        )
      )

      callback()
    })

  vorpal.command('swap', 'Swap coin').action(async function (args, callback) {
    console.log('Swapping USDC to DAI')
    const intervalId = twirlTimer()
    try {
      const accountId = await getCurrentAccountId()

      console.log(`accountId ---> : ${accountId}`)
      const didSwap = await swap(10, 'USDC', 'DAI', accountId)

      console.log(`didSwap ---> : ${didSwap}`)
      if (didSwap) {
        console.log('Yay, did swap')
      }
    } catch (error) {
      console.error('Error trying to swap ', error)
    }
    clearInterval(intervalId)
    callback()
  })

  vorpal.delimiter('🚀').show()
}

module.exports = {
  init
}
