import { mergeObject } from '@ormar/common'

export function getEnvVariables(envs?: Record<string, unknown>) {
  return mergeObject(
    envs || {},
    process.env as unknown as Record<string, unknown>
  )
}
