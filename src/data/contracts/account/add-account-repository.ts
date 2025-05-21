export interface AddAccountRepository {
  add: (account: AddAccountRepositoryParams) => Promise<string>
}

export type AddAccountRepositoryParams = {
  name: string
  email: string
  password: string
}
