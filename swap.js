const {
  getCurrentAccountId,
  getBalanceByAccountId,
  getAccounts
} = require('./accounts')
const { swap } = require('./swaps')

async function run () {
  try {
    const accountId = await getCurrentAccountId()
    const accounts = await getAccounts(process.env.PUBLIC_ADDRESS)
    const balance = await accounts.getBalanceByAccountId(accountId)

    console.log(`Swaps are on hold pending more testing right now : ${balance}`)
    process.exit()
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
