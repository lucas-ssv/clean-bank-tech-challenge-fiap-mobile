export interface AuthRepository<T> {
  onAuthStateChanged: (callback: T) => () => void
}
