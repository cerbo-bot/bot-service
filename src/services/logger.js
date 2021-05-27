import * as winston from 'winston';

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.splat(),
      winston.format.printf((info) => {
        if (typeof info.message === 'object') {
          /* eslint-disable no-param-reassign */
          info.message = JSON.stringify(info.message, null, 3);
          /* eslint-enable no-param-reassign */
        }
        return `[${info.level}] : ${info.message}`;
      })
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
