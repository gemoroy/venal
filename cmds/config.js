const { getConfig } = require('../modules/config');

module.exports = args => {
  const config = getConfig();
  console.log(JSON.stringify(config, null, 4));
};
