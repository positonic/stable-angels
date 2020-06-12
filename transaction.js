const { dsa } = require('./dsa')

async function fetchTxn (txnId) {
  return await dsa.web3.eth.getTransaction(txnId)
}
function isPending (txn) {
  return txn.blockNumber === null
}

async function isTxnPending (txnId) {
  const txn = await fetchTxn(txnId)
  return isPending(txn)
}

function trackPendingTransaction (
  transactionId,
  numberOfRetries,
  secondsPerRetry
) {
  let attemptCount = 1
  return new Promise((resolve, reject) => {
    async function fetchCheckTransaction () {
      const txn = await fetchTxn(transactionId)

      console.log(`isPending(txn) ---> : ${isPending(txn)}`)
      if (isPending(txn)) {
        console.log('... transaction is pending - retry ' + attemptCount)
        attemptCount++
        if (attemptCount <= numberOfRetries) {
          setTimeout(fetchCheckTransaction, secondsPerRetry * 1000)
        } else {
          reject('Too long')
        }
      } else {
        console.log('Transaction is confirmed')

        return resolve(txn)
      }
    }
    fetchCheckTransaction(transactionId)
  })
}

module.exports = {
  isPending,
  fetchTxn,
  isTxnPending,
  trackPendingTransaction
}

async function run () {
  const txnId =
    '0x605fb1afb53a5f70bb0120da9aa90053e585b138a9a2ca90cd487ee14e154578'

  if (isTxnPending(txnId)) {
    console.log('Transaction pending, lets track it')

    //const txn = await trackPendingTransaction(txnId)
    try {
      const txn = await trackPendingTransaction(txnId, 30, 15)
      txn.success = true
      console.log(`txn : ${JSON.stringify(txn, null, 2)}`)
    } catch (error) {
      const txn = {}
      txn.success = false
    }
  }
}
run()
