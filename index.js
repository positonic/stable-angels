const { getState, setState } = require('./state')
const command = require('./command')
const state = getState()
const setup = require('./setup')
const colors = require('colors')

console.clear()

if (state.initialised === true) {
  console.log(
    "\nOk, let's make DAI stable and make some money!\n\n".cyan +
      'Type '.cyan +
      '"help" '.yellow +
      'for a list of commands!\n'.cyan
  )

  command.init()
} else {
  setup.run()
}
