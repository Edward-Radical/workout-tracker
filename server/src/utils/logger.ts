import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Init a new logger instance with createLogger
const logger = createLogger({
// Define custom logging levels
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  // Set the default log level
  level: 'info',
  // Combines multiple formats
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [

    // Winston can log to multiple destinations, such as different files, external logging services, or the console.
    new transports.Console(),
    // new transports.File({ filename: 'app.log' }),
    // new transports.File({ filename: 'error.log', level: 'error' })

    // Creates a new log file every day with the specified date pattern
    new DailyRotateFile({
        filename: 'application-%DATE%.log',
        dirname: 'src/logs',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    })
  ]
});

export default logger;