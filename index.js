const { getState, setState } = require('./state')
const command = require('./command')
const state = getState()
const setup = require('./setup')

if (state.initialised === true) {
  command.init()
} else {
  setup.run()
}
