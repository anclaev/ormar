import {
  ENV,
  IDbEnvironment,
  IServiceEnvironment,
  VALIDATION_ERRORS,
} from '@ormar/common'

import { IsNumber, IsString } from 'class-validator'

export interface IAuthServiceConfigSchema
  extends IServiceEnvironment,
    IDbEnvironment {}

export class AuthServiceConfigSchema implements IAuthServiceConfigSchema {
  @IsString()
  NODE_ENV: ENV

  @IsString({ message: VALIDATION_ERRORS.SERVICE_HOST_NOT_PROVIDED })
  SERVICE_HOST: string

  @IsNumber({}, { message: VALIDATION_ERRORS.SERVICE_PORT_NOT_PROVIDED })
  SERVICE_PORT: number

  @IsString({ message: VALIDATION_ERRORS.DB_NAME_NOT_PROVIDED })
  DB_NAME: string

  @IsString({ message: VALIDATION_ERRORS.DB_HOST_NOT_PROVIDED })
  DB_HOST: string

  @IsNumber({}, { message: VALIDATION_ERRORS.DB_PORT_NOT_PROVIDED })
  DB_PORT: number

  @IsString({ message: VALIDATION_ERRORS.DB_USERNAME_NOT_PROVIDED })
  DB_USERNAME: string

  @IsString({ message: VALIDATION_ERRORS.DB_PWD_NOT_PROVIDED })
  DB_PWD: string
}
