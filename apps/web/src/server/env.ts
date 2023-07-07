const parseEnv = <T extends boolean>(name: string, required?: T) => {
  if (required && !process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return process.env[name] as T extends true ? string : string | undefined
}

export const env = {
  AUTH_COOKIE_NAME: parseEnv("AUTH_COOKIE_NAME", true),
  AUTH_COOKIE_DOMAIN: parseEnv("AUTH_COOKIE_DOMAIN"),
  RESEND_API_KEY: parseEnv("RESEND_API_KEY"),
}
