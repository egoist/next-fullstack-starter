declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string
    GITHUB_CLIENT_ID?: string
    GITHUB_CLIENT_SECRET?: string
    GOOGLE_CLIENT_ID?: string
    GOOGLE_CLIENT_SECRET?: string
    DATABASE_URL: string
    AUTH_COOKIE_NAME: string
    AUTH_COOKIE_DOMAIN?: string
    AUTH_SECRET: string
  }
}

type $TsFixMe = any

declare namespace Express {
  interface User {
    id: number
  }
}

declare var _singletons: Record<string, any>
