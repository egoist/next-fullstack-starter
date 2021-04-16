declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    AUTH_SECRET: string
    NEXT_PUBLIC_APP_NAME: string
    NEXT_PUBLIC_APP_URL: string
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
