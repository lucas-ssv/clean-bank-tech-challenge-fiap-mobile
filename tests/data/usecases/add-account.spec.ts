import { AddAccountImpl } from '@/data/usecases'
import { AddAccountRepositoryMock } from '@/tests/data/mocks'

describe('AddAccount usecase', () => {
  it('should call AddAccountRepository with correct values', async () => {
    const addAccountRepositoryMock = new AddAccountRepositoryMock()
    const addSpy = jest.spyOn(addAccountRepositoryMock, 'add')
    const sut = new AddAccountImpl(addAccountRepositoryMock)
    const fakeAccount = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    }

    await sut.execute(fakeAccount)

    expect(addSpy).toHaveBeenCalledWith(fakeAccount)
  })

  it('should throw if AddAccountRepository throws', async () => {
    const addAccountRepositoryMock = new AddAccountRepositoryMock()
    jest.spyOn(addAccountRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddAccountImpl(addAccountRepositoryMock)

    const promise = sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    await expect(promise).rejects.toThrow()
  })
})
