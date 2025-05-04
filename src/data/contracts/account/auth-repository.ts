export interface AuthRepository {
  onAuthStateChanged: (
    callback: (user: { email: string }) => void,
  ) => () => void
}
