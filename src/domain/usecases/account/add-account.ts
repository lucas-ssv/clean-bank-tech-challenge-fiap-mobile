export interface AddAccount {
  execute: (account: AddAccountParams) => Promise<void>
}

export type AddAccountParams = {
  name: string
  email: string
  password: string
}
