const fs = require('fs');
const path = require('path');

const getConfig = () => {
  const home = process.env.HOME;
  const file = '.venalrc';
  const filepath = path.join(home, file);
  let config;

  try {
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath);
      config = JSON.parse(raw);
    } else {
      config = {
        path: '',
        jumps: 0,
        step: 0.01,
        fees: {
          broker: 0.02,
          tax: 0.01,
        },
      };
    }
    fs.writeFileSync(filepath, JSON.stringify(config, null, 4));
  } catch (err) {
    console.error(err);
  }

  try {
    if (fs.existsSync(config.path)) {
      return config;
    } else {
      console.log(`
        Please specify absolute path to Marketlogs dir
        in ~/.venalrc file
        You can use find, eg:
        find ~/ -type d -name Marketlogs -print -quit
      `);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getConfig };
