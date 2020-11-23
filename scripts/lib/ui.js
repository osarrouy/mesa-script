const chalk = require('chalk');
const columnify = require('columnify');
const web3 = require('web3');
const { TOKEN_SYMBOL } = require('./constants');
const _log = console.log;

const _toCommas = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

const die = (message) => {
  log.error(message);
  process.exit(1);
};

const log = {
  error: (message) => {
    _log(chalk.red(`» ${message}`));
  },
  info: (message) => {
    _log(chalk.cyan(`» ${message}`));
  },
  data: (message) => {
    _log(chalk.green(`[${message}]`));
  },
  success: (message) => {
    _log(chalk.green(`» ${message}`));
  },
  orders: (_orders) => {
    const orders = _orders.map((order) => {
      return {
        order: order.id,
        volume: formatToken(TOKEN_SYMBOL, order.sellAmount),
        price: `${order.price} USDC`,
        raised: formatToken('USDC', order.buyAmount),
      };
    });
    _log('');
    _log(
      columnify(orders, {
        minWidth: 15,
        columnSplitter: ' | ',
        headingTransform: function (heading) {
          return chalk.green(heading.toUpperCase());
        },
      })
    );
    _log('');
  },
};

const formatToken = (token, value) => {
  value = value.toString();
  switch (token) {
    case 'USDC':
      return _toCommas(web3.utils.fromWei(value, 'lovelace')) + ' USDC';
    default:
      return _toCommas(web3.utils.fromWei(value, 'ether')) + ' ' + token;
  }
};

module.exports = { die, log, formatToken };
