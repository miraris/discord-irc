const events = require('events');

class ClientStub extends events.EventEmitter {
  constructor(...args) {
    super();
    this.nick = args[1]; // eslint-disable-line prefer-destructuring
  }
}

module.exports = ClientStub;
