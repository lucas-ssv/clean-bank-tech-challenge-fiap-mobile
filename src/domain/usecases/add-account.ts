export interface AddAccount {
  add: (account: AddAccountParams) => Promise<void>
}

export type AddAccountParams = {
  name: string
  email: string
  password: string
}
