export interface SaveUserRepository {
  save: (user: SaveUserRepositoryParams) => Promise<void>
}

export type SaveUserRepositoryParams = {
  userUID: string
  name: string
  email: string
}
