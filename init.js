const { prompt, Confirm } = require('enquirer')
const { accounts } = require('./smartAccounts')
const { dsa } = require('./dsa')
const { getState, setState } = require('./state')
const state = getState()

//console.log(`state : ${JSON.stringify(state, null, 2)}`)

async function setupAccount () {
  if (accounts.length === 0) {
    console.log('You have no smart accounts set up')
    process.exit()
  }
  accounts.forEach(account => {
    console.log(`${account.id} - ${account.address}`)
  })

  const accountResponse = await prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Which smart account do you want to use?'
    }
  ])

  console.log(
    `accountResponse : ${JSON.stringify(accountResponse.account, null, 2)}`
  )

  const confirmAccountResponse = new Confirm({
    name: 'question',
    message: `Do you want to set ${accountResponse.account} as instance?`
  })

  const setInstanceResponse = await confirmAccountResponse.run()

  if (setInstanceResponse === true) {
    const dsaId = accounts.filter(o => o.id === accountResponse.account)[0]
    console.log(`setting address ---> : ${dsaId.address}`)
    //dsa.setInstance(dsaId)
  } else {
    console.log('ok bye')
  }
}
async function run () {
  if (typeof state.dsaId === 'undefined' || !state.dsaId) {
    await setupAccount()
  } else {
    const confirmAccountResponse = new Confirm({
      name: 'question',
      message: `Do you want to set ${accountResponse.account} as instance?`
    })

    const setInstanceResponse = await confirmAccountResponse.run()
    if (setInstanceResponse === true) {
      setupAccount()
    } else {
      console.log('thank you')
    }
  }
}
run()
