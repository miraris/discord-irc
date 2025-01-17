const _ = require('lodash');
const Bot = require('./bot');
const { ConfigurationError } = require('./errors');

/**
 * Reads from the provided config file and returns an array of bots
 * @return {object[]}
 */
function createBots(configFile) {
  const bots = [];

  // The config file can be both an array and an object
  if (Array.isArray(configFile)) {
    configFile.forEach((config) => {
      const bot = new Bot(config);
      bot.connect();
      bots.push(bot);
    });
  } else if (_.isObject(configFile)) {
    const bot = new Bot(configFile);
    bot.connect();
    bots.push(bot);
  } else {
    throw new ConfigurationError();
  }

  return bots;
}

module.exports = { createBots };
