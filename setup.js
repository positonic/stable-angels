const { Confirm } = require('enquirer')
const { dsa } = require('./dsa')
const { getState, setState } = require('./state')
const state = getState()
const { setupAccount } = require('./accounts')

async function run () {
  if (typeof state.dsaId === 'undefined' || !state.dsaId) {
    await setupAccount()
  } else {
    const confirmAccountResponse = new Confirm({
      name: 'question',
      message: `Do you want to set up a new account?`
    })

    const setInstanceResponse = await confirmAccountResponse.run()
    if (setInstanceResponse === true) {
      const written = await setupAccount()
    } else {
      console.log('thank you')
    }
  }
}
module.exports = {
  run,
  setupAccount
}
