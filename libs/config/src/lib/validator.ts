import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import winston from 'winston'

import { loggerOptionsFactory } from '@ormar/common'

import { ConfigModuleOptions } from './types'
import { getEnvVariables } from './utils'

export function envValidation(
  options: ConfigModuleOptions
): Record<string, unknown> {
  const { envs, schema } = options

  const logger = winston.createLogger(
    loggerOptionsFactory({
      service: options.service,
      label: 'Config',
      exitOnError: true,
    })
  )

  const config = getEnvVariables(envs)

  const validatedConfig = plainToClass(schema!, config, {
    enableImplicitConversion: true,
  }) as object

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    errors.forEach((error) =>
      error.constraints
        ? Object.keys(error.constraints).forEach((key) => {
            logger.error(`${error.property}: ${error.constraints![key]}`, [
              { service: options.service },
            ])
          })
        : logger.error(error.toString())
    )

    process.exit(1)
  }
  return config
}
