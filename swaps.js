const { dsa } = require('./dsa')
const { getCurrentGasPrices } = require('./utils')
const { transactionLink } = require('./terminal')
const { getAccounts } = require('./accounts')

async function swap (withdrawAmount, from, to, accountId) {
  console.log(`SetaccountId, that cost money! ---> : ${accountId}`)
  dsa.setInstance(accountId)
  const accounts = await getAccounts(process.env.PUBLIC_ADDRESS)

  const balance = await accounts.getBalanceByAccountId(accountId)

  if (balance === 0) {
    throw Error('Insufficient balance')
  }

  let withdrawAmtInWei = dsa.tokens.fromDecimal(
    withdrawAmount,
    from.toLowerCase()
  ) // borrow flash loan and swap via Oasis

  let slippage = 0.2 // 0.2% slippage.
  let toAddress = dsa.tokens.info[to.toLowerCase()].address
  let fromAddress = dsa.tokens.info[from.toLowerCase()].address

  console.log(`toAddress ---> : ${toAddress}`)
  console.log(`fromAddress ---> : ${fromAddress}`)

  let buyAmount = await dsa.oasis.getBuyAmount(
    from,
    to,
    withdrawAmount,
    slippage
  )

  console.log(`oasis buyAmount : ${JSON.stringify(buyAmount, null, 2)}`)

  let spells = dsa.Spell()

  spells.add({
    connector: 'compound',
    method: 'withdraw',
    args: [fromAddress, withdrawAmount, 0, 0]
  })

  spells.add({
    connector: 'oasis',
    method: 'sell',
    args: [
      toAddress,
      fromAddress,
      withdrawAmtInWei,
      buyAmount.unitAmt,
      0,
      '924'
    ] // setting DAI amount with id 924
  })

  spells.add({
    connector: 'compound',
    method: 'deposit',
    args: [toAddress, 0, '924', 0] // get Payback amount with id 924
  })
  const gasPrices = await getCurrentGasPrices()

  const gasPrice = dsa.web3.utils.toWei(gasPrices.high.toString(), 'gwei')

  console.log(`gasPrice ---> : ${gasPrice}`)

  await estimate()
  // const txId = await dsa.cast({
  //   spells,

  //   gasPrice: 28000000000
  // })
  // console.log(`transactionLink ---> : ${transactionLink(txId)}`)
  async function estimate () {
    return await dsa
      .estimateCastGas({
        spells
      })
      .then(gasLimit => {
        console.log('Gasliimit is ', gasLimit)
        return gasLimit
      })
      .catch(err => {
        console.error('transaction will likely fail!!')
      })
  }
}

module.exports = {
  swap
}
