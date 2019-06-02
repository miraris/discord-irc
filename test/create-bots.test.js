/* eslint-disable no-unused-expressions, prefer-arrow-callback */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Bot = require('../lib/bot');
const index = require('../lib/index');
const testConfig = require('./fixtures/test-config.json');
const singleTestConfig = require('./fixtures/single-test-config.json');
const badConfig = require('./fixtures/bad-config.json');
const stringConfig = require('./fixtures/string-config.json');
const { createBots } = require('../lib/helpers');

chai.should();
chai.use(sinonChai);

describe('Create Bots', function () {
  const sandbox = sinon.createSandbox({
    useFakeTimers: false,
    useFakeServer: false
  });

  beforeEach(function () {
    this.connectStub = sandbox.stub(Bot.prototype, 'connect');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should work when given an array of configs', function () {
    const bots = createBots(testConfig);
    bots.length.should.equal(2);
    this.connectStub.should.have.been.called;
  });

  it('should work when given an object as a config file', function () {
    const bots = createBots(singleTestConfig);
    bots.length.should.equal(1);
    this.connectStub.should.have.been.called;
  });

  it('should throw a configuration error if any fields are missing', function () {
    function wrap() {
      createBots(badConfig);
    }

    (wrap).should.throw('Missing configuration field nickname');
  });

  it('should throw if a configuration file is neither an object or an array', function () {
    function wrap() {
      createBots(stringConfig);
    }

    (wrap).should.throw('Invalid configuration file given');
  });

  it('should be possible to run it through require(\'discord-irc\')', function () {
    const bots = index(singleTestConfig);
    bots.length.should.equal(1);
    this.connectStub.should.have.been.called;
  });
});
