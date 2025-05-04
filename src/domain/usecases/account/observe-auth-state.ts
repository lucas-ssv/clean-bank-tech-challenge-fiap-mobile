export interface ObserveAuthState {
  execute: (callback: ObserveAuthStateParams) => () => void
}

export type ObserveAuthStateParams = (user: ObserveAuthUserStateParams) => void

export type ObserveAuthUserStateParams = {
  name: string
  email: string
  userUID: string
}
