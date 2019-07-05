const _ = require('underscore');

const getPrices = (orders, options) => {
  const bids = _.where(orders, {
    bid: 'True',
    jumps: options.jumps,
  });

  let max = null;
  if (bids.length) {
    max = _.max(bids, o => {
      return Number(o.price);
    });
  }

  const sells = _.where(orders, {
    bid: 'False',
    jumps: options.jumps,
  });

  let min = null;
  if (sells.length) {
    min = _.min(sells, o => {
      return Number(o.price);
    });
  }

  const prices = {
    buy: max ? Number(max.price) + options.step : 0,
    sell: min ? Number(min.price) - options.step : 0,
  };

  prices.margin =
    (1 -
      (prices.buy + prices.buy * options.fees.broker) /
        (prices.sell -
          prices.sell * options.fees.broker -
          prices.sell * options.fees.tax)) *
    100;
  prices.buy = prices.buy.toFixed(2);
  prices.sell = prices.sell.toFixed(2);
  prices.margin = prices.margin.toFixed(2);

  return prices;
};

module.exports = { getPrices };
