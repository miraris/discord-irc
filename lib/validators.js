const _ = require('lodash');
const { ConfigurationError } = require('./errors');

/**
 * Validates a given channel mapping, throwing an error if it's invalid
 * @param  {Object} mapping
 * @return {Object}
 */
function validateChannelMapping(mapping) {
  if (!_.isObject(mapping)) {
    throw new ConfigurationError('Invalid channel mapping given');
  }

  return mapping;
}

module.exports = { validateChannelMapping };
