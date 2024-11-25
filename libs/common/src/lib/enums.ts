export enum SERVICES {
  DEFAULT = 'Ormar',
  GATEWAY = 'Gateway',
  AUTH_SERVICE = 'Auth',
}

export enum VALIDATION_ERRORS {
  HOST_NOT_PROVIDED = 'Хост не указан',
  PORT_NOT_PROVIDED = 'Порт не указан',
  SERVICE_HOST_NOT_PROVIDED = 'Хост сервиса не указан',
  SERVICE_PORT_NOT_PROVIDED = 'Порт сервиса не указан',
  DB_HOST_NOT_PROVIDED = 'Хост базы данных не указан',
  DB_PORT_NOT_PROVIDED = 'Порт базы данных не указан',
  DB_NAME_NOT_PROVIDED = 'Имя базы данных не указано',
  DB_USERNAME_NOT_PROVIDED = 'Пользователь базы данных не указан',
  DB_PWD_NOT_PROVIDED = 'Пароль базы данных не указан',
}
