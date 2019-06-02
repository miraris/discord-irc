const chai = require('chai');
const irc = require('irc-upd');
const discord = require('discord.js');
const Bot = require('../lib/bot');
const config = require('./fixtures/single-test-config.json');
const caseConfig = require('./fixtures/case-sensitivity-config.json');
const DiscordStub = require('./stubs/discord-stub');
const ClientStub = require('./stubs/irc-client-stub');
const { validateChannelMapping } = require('../lib/validators');

chai.should();

describe('Channel Mapping', () => {
  before(() => {
    irc.Client = ClientStub;
    discord.Client = DiscordStub;
  });

  it('should fail when not given proper JSON', () => {
    const wrongMapping = 'not json';
    function wrap() {
      validateChannelMapping(wrongMapping);
    }

    (wrap).should.throw('Invalid channel mapping given');
  });

  it('should not fail if given a proper channel list as JSON', () => {
    const correctMapping = { '#channel': '#otherchannel' };
    function wrap() {
      validateChannelMapping(correctMapping);
    }

    (wrap).should.not.throw();
  });

  it('should clear channel keys from the mapping', () => {
    const bot = new Bot(config);
    bot.channelMapping['#discord'].should.equal('#irc');
    bot.invertedMapping['#irc'].should.equal('#discord');
    bot.channels.should.contain('#irc channelKey');
  });

  it('should lowercase IRC channel names', () => {
    const bot = new Bot(caseConfig);
    bot.channelMapping['#discord'].should.equal('#irc');
    bot.channelMapping['#otherDiscord'].should.equal('#otherirc');
  });

  it('should work with ID maps', () => {
    const bot = new Bot(config);
    bot.channelMapping['1234'].should.equal('#channelforid');
    bot.invertedMapping['#channelforid'].should.equal('1234');
  });
});
