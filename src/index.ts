import * as uuid from 'uuid'

import logger from './logger'
import { SupportedTickerSymbols } from './types'

export default function run() {
  const payload = createBuyOrderPayload('btcusd', '0.01', '3633.00')
  logger.info('Executing by order using payload:', payload)

  const encodedPayload = encodeGeminiPayload(payload)
  console.log('encoded payload:', encodedPayload)

  return encodedPayload
}

const createBuyOrderPayload = (symbol: SupportedTickerSymbols, amount: string, price: string) => ({
  request: '/v1/order/new',
  nonce: Date.now(),
  client_order_id: uuid.v4(),
  symbol,
  amount,
  price,
  side: 'buy',
  type: 'exchange limit'
})

function encodeGeminiPayload<T>(payload: T) {
  const buffer = Buffer.from(JSON.stringify(payload))
  const encodedPayload = buffer.toString('base64')

  return encodedPayload
}

run()

/* TODOS:
 * Put this in a list outside of the codebase
 * Add a testing framework to start TDDing this solution.
 * Decide on initial API.
 * Strat for publishing to NPM.
 */
