#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const path = require('path');
const checkEnv = require('check-env');
const stripJsonComments = require('strip-json-comments');
const { endsWith } = require('lodash');
const helpers = require('./helpers');
const { ConfigurationError } = require('./errors');
const { version } = require('../package.json');

function readJSONConfig(filePath) {
  const configFile = fs.readFileSync(filePath, { encoding: 'utf8' });
  try {
    return JSON.parse(stripJsonComments(configFile));
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ConfigurationError('The configuration file contains invalid JSON');
    } else {
      throw err;
    }
  }
}

function run() {
  program
    .version(version)
    .option(
      '-c, --config <path>',
      'Sets the path to the config file, otherwise read from the env variable CONFIG_FILE.'
    )
    .parse(process.argv);

  const confgFile = program.config || process.env.CONFIG_FILE;

  if (!confgFile) {
    throw new Error(
      'No config file specified, either pass -c param or set the CONFIG_FILE environment variable'
    );
  }

  const completePath = path.resolve(process.cwd(), confgFile);
  const config = endsWith(confgFile, '.js')
    ? require(completePath)
    : readJSONConfig(completePath);
  helpers.createBots(config);
}

module.exports = run;
