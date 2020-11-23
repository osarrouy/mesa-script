# PrimeDAO Token Sale

> A set of scripts to deploy token sales on [MESA](https://mesa.eth.link/).

## Installation

```
git clone https://github.com/osarrouy/mesa-script.git
```

```
cd mesa-script && npm install
```

## Usage

### 1. Parametrize

Token sale parameters are defined in `scripts/lib/constants.js`. Update `TOKEN_ID`, `TOKEN_SYMBOL`, `ORDERS`, `START_DATE` and `END_DATE` according to your sale.

### 3. Run the script

```
npm run params:extract
```
