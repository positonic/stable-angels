const { getCurrentAccountId } = require('./accounts')
const { swap } = require('./swaps')

async function run () {
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
}
run()
