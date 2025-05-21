export interface ObserveAndLoadAccountByEmail {
  execute: (callback: ObserveAndLoadAccountByEmailParams) => () => void
}

export type ObserveAndLoadAccountByEmailParams = (
  user: ObserveAndLoadAccountByEmailUserParams | null,
) => void

export type ObserveAndLoadAccountByEmailUserParams = {
  name: string
  email: string
  userUID: string
}
