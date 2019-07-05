const minimist = require('minimist');

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
    case 'config':
      require('./cmds/config')(args);
      break;
    case 'help':
      require('./cmds/help')(args);
      break;
    case 'version':
      require('./cmds/version')(args);
      break;
    case 'sell':
      args.bid = false;
      require('./cmds/copy.js')(args);
      break;
    case 'buy':
      args.bid = true;
      require('./cmds/copy.js')(args);
      break;
    default:
      require('./cmds/help')(args);
      break;
  }
};
