const events = require('events');
const emitter = new events.EventEmitter();
const clipboard = require('clipboardy');
const chalk = require('chalk');

const { Watcher } = require('../modules/watcher');
const { getPrices } = require('../modules/prices');
const { getConfig } = require('../modules/config');

const color = value => {
  value = Number(value);

  if (value < 2) {
    return chalk.red(value);
  } else if (value > 10) {
    return chalk.green(value);
  } else {
    return chalk.yellow(value);
  }
};

module.exports = args => {
  const config = getConfig();
  if (!config) return;
  console.clear();
  console.log('Waiting export..');
  options = {
    bid: args.bid ? 'True' : 'False',
    jumps: args.jumps ? args.jumps.toString() : config.jumps.toString(),
    path: config.path,
    fees: config.fees,
  };

  const watcher = new Watcher({ path: options.path, emitter: emitter });
  emitter.on('file', data => {
    const prices = getPrices(data.orders, options);
    console.clear();

    let price;
    if (args.bid) {
      price = prices.buy;
    } else {
      price = prices.sell;
    }

    color(prices.margin);
    clipboard.write(price).then(() => {
      console.log(`
      ITEM:   ${data.name}
      SELL:   ${prices.sell}
      BUY:    ${prices.buy}
      MARGIN: ${color(prices.margin)}
      `);
    });
  });
  watcher.start();
};
