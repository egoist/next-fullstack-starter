declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string
    GITHUB_CLIENT_ID?: string
    GITHUB_CLIENT_SECRET?: string
    GOOGLE_CLIENT_ID?: string
    GOOGLE_CLIENT_SECRET?: string
    DATABASE_URL: string
    AUTH_SECRET: string
    AUTH_COOKIE_NAME: string
    AUTH_COOKIE_DOMAIN: string
    NEXT_PUBLIC_APP_DOMAIN?: string
  }
  interface Global {
    _singletons: Record<string, any>
  }
}

type $TsFixMe = any

declare namespace Express {
  interface User {
    id: number
  }
}
