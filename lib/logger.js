const { createLogger, transports, format } = require('winston');
// const winston = require('winston');
const { inspect } = require('util');

function formatter(info) {
  const stringifiedRest = inspect(
    Object.assign({}, info, {
      level: undefined,
      message: undefined,
      splat: undefined
    }),
    { depth: null }
  );

  const padding = (info.padding && info.padding[info.level]) || '';
  if (stringifiedRest !== '{}') {
    return `${info.timestamp} ${info.level}:${padding} ${info.message} ${stringifiedRest}`;
  }

  return `${info.timestamp} ${info.level}:${padding} ${info.message}`;
}

const logger = createLogger({
  transports: [new transports.Console()],
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(format.colorize(), format.timestamp(), format.printf(formatter))
});

module.exports = logger;
