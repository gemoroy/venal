const messages = {
  main: `
  venal [command] <options>
  sell            copy sell price
  buy             copy buy price
  `,
};
module.exports = args => {
  console.log(messages.main);
};
