import { ClassConstructor } from 'class-transformer'

export type ConfigModuleOptions = {
  schema?: ClassConstructor<unknown>
  envs?: Record<string, unknown>
  service?: string
}
