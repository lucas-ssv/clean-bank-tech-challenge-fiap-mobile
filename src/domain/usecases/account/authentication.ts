export interface Authentication {
  execute: (user: AuthenticationParams) => Promise<void>
}

export type AuthenticationParams = {
  email: string
  password: string
}
