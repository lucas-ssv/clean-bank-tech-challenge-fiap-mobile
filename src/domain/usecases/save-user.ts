export interface SaveUser {
  execute: (user: SaveUserParams) => Promise<void>
}

export type SaveUserParams = {
  name: string
  email: string
}
