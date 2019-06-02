/* eslint-disable class-methods-use-this */
const events = require('events');
const sinon = require('sinon');
const discord = require('discord.js');

function createDiscordStub(sendStub, discordUsers) {
  return class DiscordStub extends events.EventEmitter {
    constructor() {
      super();
      this.user = {
        id: 'testid'
      };
      this.channels = new discord.Collection();
      this.options = {
        http: {
          cdn: ''
        }
      };

      this.users = discordUsers;
      this.guilds = new discord.Collection();
      this.guild = this.createGuildStub();
      this.guilds.set(this.guild.id, this.guild);
    }

    addTextChannel(guild, textChannel) {
      const textChannelData = Object.assign(
        {
          type: 'text'
        },
        textChannel
      );
      const textChannelObj = new discord.TextChannel(guild, textChannelData);
      textChannelObj.send = sendStub;
      this.channels.set(textChannelObj.id, textChannelObj);
      return textChannelObj;
    }

    createGuildStub(guildData = {}) {
      const guild = {
        id: '1',
        client: this,
        roles: new discord.Collection(),
        members: new discord.Collection(),
        emojis: new discord.Collection(),
        channels: new discord.Collection(),
        addTextChannel: (textChannel) => {
          const textChannelObj = this.addTextChannel(guild, textChannel);
          textChannelObj.guild.channels.set(textChannelObj.id, textChannelObj);
          return textChannelObj;
        }
      };
      Object.assign(guild, guildData);
      this.guilds.set(guild.id, guild);

      if (guild.id === '1') {
        guild.addTextChannel({
          name: 'discord',
          id: '1234'
        });
      }

      return guild;
    }

    login() {
      return sinon.stub();
    }
  };
}

module.exports = createDiscordStub;
