const messages = {
  main: `
  venal [command] <options>

        sell                copy sell price
        buy                 copy buy price
                  --jumps   jumps range, default 0

        config              print current configuration
        help                print this message
  `,
};
module.exports = args => {
  console.log(messages.main);
};
