const { getState, setState } = require('./state')
const { prompt, Confirm, Select } = require('enquirer')
const state = getState()
const { dsa } = require('./dsa')
const { getCurrentGasPrices } = require('./utils')
const { transactionLink } = require('./terminal')

async function getCurrentAccountId () {
  if (state.dsaId) {
    return state.dsaId
  } else {
    const state = await setupAccount()
    return state.dsaId
  }
}
async function setupAccount () {
  if (state.accounts.length === 0) {
    console.log('You have no smart accounts set up')
    const confirmAccountCreation = new Confirm({
      name: 'question',
      message: `Do you want to set up a smart account now? This action will cost gas?`
    })

    const confirmAccountCreationResponse = await confirmAccountCreation.run()

    if (confirmAccountCreationResponse === true) {
      const gasPrices = await getCurrentGasPrices()

      const gasPrice = dsa.web3.utils.toWei(gasPrices.high.toString(), 'gwei')

      // const txnId = await dsa.build({
      //   gasPrice
      // })
      const txnId =
        '0x8699f24f5f5946d5b6bf2af9afeed16a3b4eaf3a75028edd28fe330d00404556 '

      const txn = {}

      try {
        txn = await trackPendingTransaction(txnId, 30, 15)
        txn.success = true
        console.log(`txn : ${JSON.stringify(txn, null, 2)}`)
        const acccounts = getAccounts()
        state.accounts = acccounts
      } catch (error) {
        txn.success = false
        console.log(
          'Your transaction appears to be taking longer than expect, please re-run after your transactions completes.'
        )
        console.log(
          'You can keep track of your transaction here - ' +
            transactionLink(transactionId)()
        )
      }
    }
  } else {
    console.log('ID  - Smart account address')
    state.accounts.forEach(account => {
      console.log(`${account.id} - ${account.address}`)
    })
  }

  console.log(`state.accounts : ${JSON.stringify(state.accounts, null, 2)}`)
  if (state.accounts.length) {
    const accountPrompt = new Select({
      name: 'account',
      message:
        'Use arrows and space bar to select which smart account do you want to use?',
      limit: 10,
      multiple: false,
      choices: state.accounts.map(o => {
        return {
          name: o.address,
          value: o.id
        }
      })
    })
    const selectedAccount = await accountPrompt.run()

    console.log(`selectedAccount : ${JSON.stringify(selectedAccount, null, 2)}`)

    // function sleep (ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms))
    // }
    //const selectedAccount = await accountPrompt.run()
    // accountPrompt
    //   .run()
    //   .then(answer => console.log('Answer:', answer))
    //   .catch(console.error)
    // console.log(`selectedAccount : ${JSON.stringify(selectedAccount, null, 2)}`)
    // sleep(2000)
    // process.exit()
    const confirmAccountResponse = new Confirm({
      name: 'question',
      message: `Do you want to set ${selectedAccount} as instance, this costs gas?`
    })

    const setInstanceResponse = await confirmAccountResponse.run()

    if (setInstanceResponse === true) {
      const dsas = state.accounts.filter(o => o.address === selectedAccount)
      //console.log(`dsas : ${JSON.stringify(dsas, null, 2)}`)

      if (dsas.length === 0) throw Error('Invalid smart account selection')

      const dsaId = dsas[0].id
      state.dsaId = dsaId
      state.initialised = true
      setState(state)
      dsa.setInstance(dsaId)
      return state
    } else {
      console.log('ok bye')
      process.exit()
    }
  } else {
    console.log('still no account, bye for now')
  }
}

async function getBalanceByAccountId (accountId) {
  const account = this.filter(o => o.id === accountId)[0]

  const balance = await dsa.web3.eth.getBalance(account.address)
  return balance
}

async function getAccounts (ownerAddress) {
  const accounts = await dsa.getAccounts(ownerAddress)
  accounts.getBalanceByAccountId = getBalanceByAccountId

  return accounts
}

module.exports = {
  getCurrentAccountId,
  setupAccount,
  getAccounts
}
async function testRun () {
  const accounts = await getAccounts(process.env.PUBLIC_ADDRESS)

  const balance = await accounts.getBalanceByAccountId('856')
  console.log(`balance!! ---> : ${balance}`)
}
//testRun()
