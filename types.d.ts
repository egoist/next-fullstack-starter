declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    DB_URL: string
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
