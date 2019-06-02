/* eslint-disable no-unused-expressions, prefer-arrow-callback */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const cli = require('../lib/cli');
const helpers = require('../lib/helpers');
const testConfig = require('./fixtures/test-config.json');
const singleTestConfig = require('./fixtures/single-test-config.json');

chai.should();
chai.use(sinonChai);

describe('CLI', function () {
  const sandbox = sinon.createSandbox({
    useFakeTimers: false,
    useFakeServer: false
  });

  beforeEach(function () {
    this.createBotsStub = sandbox.stub(helpers, 'createBots');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should be possible to give the config as an env var', function () {
    process.env.CONFIG_FILE = `${process.cwd()}/test/fixtures/test-config.json`;
    process.argv = ['node', 'index.js'];
    cli();
    this.createBotsStub.should.have.been.calledWith(testConfig);
  });

  it('should strip comments from JSON config', function () {
    process.env.CONFIG_FILE = `${process.cwd()}/test/fixtures/test-config-comments.json`;
    process.argv = ['node', 'index.js'];
    cli();
    this.createBotsStub.should.have.been.calledWith(testConfig);
  });

  it('should support JS configs', function () {
    process.env.CONFIG_FILE = `${process.cwd()}/test/fixtures/test-javascript-config.js`;
    process.argv = ['node', 'index.js'];
    cli();
    this.createBotsStub.should.have.been.calledWith(testConfig);
  });

  it('should throw a ConfigurationError for invalid JSON', function () {
    process.env.CONFIG_FILE = `${process.cwd()}/test/fixtures/invalid-json-config.json`;
    process.argv = ['node', 'index.js'];
    const wrap = () => cli();
    wrap.should.throw('The configuration file contains invalid JSON');
  });

  it('should be possible to give the config as an option', function () {
    delete process.env.CONFIG_FILE;
    process.argv = [
      'node',
      'index.js',
      '--config',
      `${process.cwd()}/test/fixtures/single-test-config.json`
    ];

    cli();
    this.createBotsStub.should.have.been.calledWith(singleTestConfig);
  });
});
