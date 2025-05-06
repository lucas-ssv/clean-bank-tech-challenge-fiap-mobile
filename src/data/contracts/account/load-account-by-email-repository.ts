export type LoadAccountByEmailRepositoryResult = {
  name: string
  email: string
  userUID: string
}

export interface LoadAccountByEmailRepository {
  loadByEmail: (
    email: string,
  ) => Promise<LoadAccountByEmailRepositoryResult | null>
}
