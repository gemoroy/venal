const _ = require('underscore');

const oomStep = (price) => {
  const order = Math.pow(10, Math.floor(Math.log(Number(price)) / Math.LN10 + 0.000000001));
  return order * .001;
}

const getPrices = (orders, options) => {
  orders = _.filter(orders, order => {
    return Number(order.jumps) <= options.jumps;
  });

  const bids = _.where(orders, {
    bid: 'True',
  });

  let max = null;
  if (bids.length) {
    max = _.max(bids, o => {
      return Number(o.price);
    });
  }

  const sells = _.where(orders, {
    bid: 'False',
  });

  let min = null;
  if (sells.length) {
    min = _.min(sells, o => {
      return Number(o.price);
    });
  }

  const prices = {
    buy: max ? Number(max.price) + oomStep(max.price) : 0,
    sell: min ? Number(min.price) - oomStep(min.price) : 0,
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
