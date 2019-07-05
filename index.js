const minimist = require('minimist');

const config = {
  path:
    '/home/gemoroy/Games/eve-online/drive_c/users/gemoroy/My Documents/EVE/logs/Marketlogs',
  jumps: 0,
  step: 0.01,
  fees: {
    broker: 0.02,
    tax: 0.01,
  },
};

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0];

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'help':
      require('./cmds/help')(args);
      break;
    case 'version':
      require('./cmds/version')(args);
      break;
    case 'sell':
      require('./cmds/copy.js')({ bid: false, config: config });
      break;
    case 'buy':
      require('./cmds/copy.js')({ bid: true, config: config });
      break;
    default:
      console.error(`invalid command: ${cmd}`);
      break;
  }
};
