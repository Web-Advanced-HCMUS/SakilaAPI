import winston from 'winston';
import expressWinston from 'express-winston';

const loggerTransports = [
    new winston.transports.File({
        level: 'info',
        filename: 'log/logs.log'
    })
]

const loggerRequestTransports = [
    new winston.transports.File({
        level: 'info',
        filename: 'log/requestInfo.log'
    }),
    new winston.transports.File({
        level: 'warn',
        filename: 'log/requestWarnings.log'
    }),
    new winston.transports.File({
        level: 'error',
        filename: 'log/requestErrors.log'
    })
]

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint(),
    ),
    transports: loggerTransports
});

const requestLogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.json(),
        winston.format.prettyPrint(),
    ),
    transports: loggerRequestTransports
});

const winstonLogger = expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const winstonErrorLogger = expressWinston.errorLogger({
    winstonInstance: logger
});

export {
    winstonLogger,
    winstonErrorLogger
}

//log đủ thông tin
//log đủ request
// k ảnh hưởng vận hành server
// rotate lưu file
// async chronus
// tra cứu lại
