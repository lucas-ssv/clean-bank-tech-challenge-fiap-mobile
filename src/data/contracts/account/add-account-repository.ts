export interface AddAccountRepository {
  add: (account: AddAccountRepositoryParams) => Promise<void>
}

export type AddAccountRepositoryParams = {
  name: string
  email: string
  password: string
}
