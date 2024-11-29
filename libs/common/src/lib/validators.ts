import { IsNumber, IsString } from 'class-validator'

import {
  ENV,
  IDbEnvironment,
  IEndpoint,
  IEnvironment,
  IServiceEnvironment,
} from './environments'

import { VALIDATION_ERRORS } from './enums'

export class EndpointValidator implements IEndpoint {
  @IsString({ message: VALIDATION_ERRORS.HOST_NOT_PROVIDED })
  HOST: string

  @IsNumber({}, { message: VALIDATION_ERRORS.PORT_NOT_PROVIDED })
  PORT: number
}

export class EnvironmentValidationSchema implements IEnvironment {
  @IsString()
  NODE_ENV: ENV
}

export class ServiceEnvironmentValidationSchema implements IServiceEnvironment {
  @IsString()
  NODE_ENV: ENV

  @IsString({ message: VALIDATION_ERRORS.SERVICE_HOST_NOT_PROVIDED })
  SERVICE_HOST: string

  @IsNumber({}, { message: VALIDATION_ERRORS.SERVICE_PORT_NOT_PROVIDED })
  SERVICE_PORT: number

  @IsString({ message: VALIDATION_ERRORS.KAFKA_HOST_NOT_PROVIDED })
  KAFKA_HOST: string

  @IsNumber({}, { message: VALIDATION_ERRORS.KAFKA_PORT_PROVIDED })
  KAFKA_PORT: number
}

export class DbEnvironmentValidationSchema implements IDbEnvironment {
  @IsString()
  NODE_ENV: ENV

  @IsString({ message: VALIDATION_ERRORS.DB_HOST_NOT_PROVIDED })
  DB_HOST: string

  @IsNumber({}, { message: VALIDATION_ERRORS.DB_PORT_NOT_PROVIDED })
  DB_PORT: number

  @IsString({ message: VALIDATION_ERRORS.DB_NAME_NOT_PROVIDED })
  DB_NAME: string

  @IsString({ message: VALIDATION_ERRORS.DB_USERNAME_NOT_PROVIDED })
  DB_USERNAME: string

  @IsString({ message: VALIDATION_ERRORS.DB_PWD_NOT_PROVIDED })
  DB_PWD: string
}
