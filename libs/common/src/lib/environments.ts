export type ENV = 'production' | 'development' | 'testing' | 'local'

export interface IEndpoint {
  HOST: string
  PORT: number
}

export interface IEnvironment {
  NODE_ENV: ENV
}

export interface IServiceEnvironment extends IEnvironment {
  SERVICE_HOST: string
  SERVICE_PORT: number
  KAFKA_HOST: string
  KAFKA_PORT: number
}

export interface IDbEnvironment extends IEnvironment {
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USERNAME: string
  DB_PWD: string
}
