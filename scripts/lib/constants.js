const USDC_ID = 4;
const TOKEN_SYMBOL = 'API3';
const TOKEN_ID = 156;

const ORDERS = [
  { volume: 500000, price: 0.3 },
  { volume: 750000, price: 0.38 },
  { volume: 1250000, price: 0.5 },
  { volume: 1750000, price: 0.62 },
  { volume: 2500000, price: 0.76 },
  { volume: 3500000, price: 0.92 },
  { volume: 6000000, price: 1 },
  { volume: 3500000, price: 1.16 },
  { volume: 2500000, price: 1.32 },
  { volume: 1750000, price: 1.5 },
];

const START_DATE = '16 Nov 2020 15:00:00 GMT';
const END_DATE = '30 Nov 2020 15:00:00 GMT';

module.exports = {
  ORDERS,
  START_DATE,
  END_DATE,
  USDC_ID,
  TOKEN_ID,
  TOKEN_SYMBOL,
};
