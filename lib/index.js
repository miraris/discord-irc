#!/usr/bin/env node

const { createBots } = require('./helpers');

/* istanbul ignore next */
if (!module.parent) {
  require('./cli')();
}

module.exports = createBots;
