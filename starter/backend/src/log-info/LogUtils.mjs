import winston from 'winston'

export function createLogInfo(logInfo) {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {name: logInfo},
        transports: [new winston.transports.Console()]
    })
}
