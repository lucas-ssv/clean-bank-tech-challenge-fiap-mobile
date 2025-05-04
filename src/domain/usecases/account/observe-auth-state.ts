export interface ObserveAuthState {
  execute: (callback: ObserveAuthStateParams) => () => void
}

export type ObserveAuthStateParams = (user: ObserveAuthStateUserParams) => void

export type ObserveAuthStateUserParams = {
  email: string
}
