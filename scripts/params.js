// https://docs.gnosis.io/protocol/docs/tutorial-limit-orders/
// https://docs.gnosis.io/protocol/docs/tutorial-multiple-orders/

const { ORDERS, START_DATE, END_DATE, TOKEN_SYMBOL } = require('./lib/constants');
const { die, formatToken, log } = require('./lib/ui');
const { utils } = require('./lib/utils');

const main = () => {
  try {
    log.info('Processing sale parameters ...');
    const orders = utils.orders.reduce(ORDERS);
    const { sold, raised } = utils.orders.aggregate(orders);
    const validFrom = utils.batch.id(START_DATE);
    const validUntil = utils.batch.id(END_DATE);
    log.orders(orders);
    log.info(`Total sold:   ${formatToken(TOKEN_SYMBOL, sold)}`);
    log.info(`Total raised: ${formatToken('USDC', raised)}`);
    log.info(`Start batch:  ${validFrom}`);
    log.info(`End batch:    ${validUntil}`);
    console.log('');

    const params = utils.orders.params(orders);
    for (const [key, value] of Object.entries(params)) {
      log.info(key);
      log.data(value);
    }
  } catch (e) {
    die(e);
  }
};

main();
