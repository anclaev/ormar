import winston from 'winston'

import { expandObject } from './utils'

type LoggerOptions = {
  exitOnError?: boolean
  label?: string
  service?: string
}

const format = winston.format.printf(
  ({ metadata, level, message, label, timestamp }) => {
    let meta: Record<string, unknown> = {}

    if (metadata) {
      meta = expandObject(metadata as Record<string, Record<string, unknown>>)
    }

    return `\x1b[32m[${meta['service'] ?? 'Ormar'}]\x1b[0m ${timestamp} \x1b[32m${label ? ' [' + label + '] ' : ' [App]'} [${level}\x1b[32m]\x1b[0m: \x1b[37m${message}`
  }
)

export const loggerOptionsFactory = (
  options: LoggerOptions
): winston.LoggerOptions => ({
  defaultMeta: {
    service: options.service,
    label: options.label,
  },
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.metadata({ key: 'metadata' }),
        winston.format.label({ label: options.label! }),
        winston.format.colorize({ all: true }),
        winston.format.simple(),
        winston.format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }),
        format
      ),
    }),
  ],
  exitOnError: options.exitOnError!,
})

export const createLogger = (
  options: LoggerOptions = {
    exitOnError: false,
    label: 'Logger',
  }
) => winston.createLogger(loggerOptionsFactory(options))
