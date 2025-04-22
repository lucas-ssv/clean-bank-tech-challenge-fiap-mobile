export interface SaveUserRepository {
  save: (user: SaveUserRepositoryParams) => Promise<void>
}

export type SaveUserRepositoryParams = {
  name: string
  email: string
}
