const { getState, setState } = require('./state')
const command = require('./command')
const state = getState()
const setup = require('./setup')

console.clear()

if (state.initialised === true) {
  console.log('Initailised')

  command.init()
} else {
  setup.run()
}
