import { AddAccount, AddAccountParams } from '@/domain/usecases'

class AddAccountImpl implements AddAccount {
  private userRepository

  constructor(userRepository: UserRepositoryMock) {
    this.userRepository = userRepository
  }

  async execute(account: AddAccountParams): Promise<void> {
    await this.userRepository.add(account)
  }
}

class UserRepositoryMock {
  async add(account: any): Promise<void> {}
}

describe('AddAccount usecase', () => {
  it('should call UserRepository with correct values', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const addSpy = jest.spyOn(userRepositoryMock, 'add')
    const sut = new AddAccountImpl(userRepositoryMock)

    await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })
})
