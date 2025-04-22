export interface LoadAccountRepository {
  auth: (user: LoadAccountRepositoryParams) => Promise<void>
}

export type LoadAccountRepositoryParams = {
  email: string
  password: string
}
