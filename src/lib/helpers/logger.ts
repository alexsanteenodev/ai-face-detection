import winston from 'winston'

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(
    (info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
)
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  //   format: winston.format.colorize(),
  transports: new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
  }),
})

export default logger
