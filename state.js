const fs = require('fs')
require('dotenv').config()

module.exports = {
  getState: function () {
    try {
      return JSON.parse(fs.readFileSync(`${process.env.STATE_FILE}`, 'utf8'))
    } catch (err) {
      console.error(err)
    }
  },
  setState: function (state) {
    try {
      return fs.writeFileSync(
        `./${process.env.STATE_FILE}`,
        JSON.stringify(state)
      )
    } catch (err) {
      console.error(err)
    }
  }
}
