import { SaveUser, SaveUserParams } from '@/domain/usecases'

class SaveUserImpl implements SaveUser {
  private saveUserRepository

  constructor(saveUserRepository: SaveUserRepositoryMock) {
    this.saveUserRepository = saveUserRepository
  }

  async execute(user: SaveUserParams): Promise<void> {
    await this.saveUserRepository.save(user)
  }
}

class SaveUserRepositoryMock {
  async save(user: any): Promise<void> {}
}

describe('SaveUser usecase', () => {
  it('should call SaveUserRepository with correct values', async () => {
    const saveUserRepositoryMock = new SaveUserRepositoryMock()
    const saveSpy = jest.spyOn(saveUserRepositoryMock, 'save')
    const sut = new SaveUserImpl(saveUserRepositoryMock)

    await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
    })

    expect(saveSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
    })
  })
})
