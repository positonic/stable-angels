const supportsHyperlinks = require('supports-hyperlinks')
const ansiEscapes = require('ansi-escapes')

function transactionLink (transactionId) {
  return terminalLink(
    'View Transaction',
    `https://etherscan.io/tx/${transactionId}`
  )
}

const terminalLink = (text, url, { target = 'stdout', ...options } = {}) => {
  if (!supportsHyperlinks[target]) {
    // If the fallback has been explicitly disabled, don't modify the text itself.
    if (options.fallback === false) {
      return text
    }

    return typeof options.fallback === 'function'
      ? options.fallback(text, url)
      : `${text} (\u200B${url}\u200B)`
  }

  return ansiEscapes.link(text, url)
}

module.exports = {
  transactionLink
}
