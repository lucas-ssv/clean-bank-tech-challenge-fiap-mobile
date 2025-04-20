export interface Authentication {
  auth: (user: AuthenticationParams) => Promise<void>
}

export type AuthenticationParams = {
  email: string
  password: string
}
