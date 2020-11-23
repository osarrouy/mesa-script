const BN = require('bignumber.js');
const { START_DATE, END_DATE, USDC_ID, TOKEN_ID } = require('./constants');
const web3 = require('web3');

const _toBuyAmount = (_volume, _price) => {
  const volume = new BN(_volume.toString());
  const price = new BN(_price.toString());
  const amount = volume.times(price);
  return web3.utils.toWei(amount.toString(), 'lovelace').toString();
};

const _toSellAmount = (volume) => {
  return web3.utils.toWei(volume.toString(), 'ether');
};

const utils = {
  batch: {
    id: (_date) => {
      const base = new BN('300000');
      const date = new BN(Date.parse(_date));

      return date.div(base).toFixed(0);
    },
  },
  orders: {
    aggregate: (orders) => {
      const sell = (accumulator, order) => accumulator.plus(new BN(order.sellAmount));
      const buy = (accumulator, order) => accumulator.plus(new BN(order.buyAmount));

      const sold = orders.reduce(sell, new BN('0')).toFixed(0);
      const raised = orders.reduce(buy, new BN('0')).toFixed(0);

      return { sold, raised };
    },
    reduce: (orders) => {
      return orders.map((order, index) => {
        return { id: index + 1, price: order.price, buyAmount: _toBuyAmount(order.volume, order.price), sellAmount: _toSellAmount(order.volume) };
      });
    },
    params: (orders) => {
      const buyTokens = orders.map((order) => USDC_ID);
      const sellTokens = orders.map((order) => TOKEN_ID);
      const validFroms = orders.map((order) => utils.batch.id(START_DATE));
      const validUntils = orders.map((order) => utils.batch.id(END_DATE));
      const buyAmounts = orders.map((order) => order.buyAmount);
      const sellAmounts = orders.map((order) => order.sellAmount);

      return { buyTokens, sellTokens, validFroms, validUntils, buyAmounts, sellAmounts };
    },
  },
};

module.exports = { utils };
