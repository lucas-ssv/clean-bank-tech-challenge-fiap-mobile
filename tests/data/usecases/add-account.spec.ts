import { AddAccountImpl } from '@/data/usecases'
import {
  AddAccountRepositoryMock,
  SaveUserRepositoryMock,
} from '@tests/data/mocks'

describe('AddAccount usecase', () => {
  it('should call AddAccountRepository with correct values', async () => {
    const addAccountRepositoryMock = new AddAccountRepositoryMock()
    const addSpy = jest.spyOn(addAccountRepositoryMock, 'add')
    const saveUserRepositoryMock = new SaveUserRepositoryMock()
    const sut = new AddAccountImpl(
      addAccountRepositoryMock,
      saveUserRepositoryMock,
    )
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
    const saveUserRepositoryMock = new SaveUserRepositoryMock()
    const sut = new AddAccountImpl(
      addAccountRepositoryMock,
      saveUserRepositoryMock,
    )

    const promise = sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    await expect(promise).rejects.toThrow()
  })

  it('should call SaveUserRepository with correct values', async () => {
    const addAccountRepositoryMock = new AddAccountRepositoryMock()
    const saveUserRepositoryMock = new SaveUserRepositoryMock()
    const saveSpy = jest.spyOn(saveUserRepositoryMock, 'save')
    const sut = new AddAccountImpl(
      addAccountRepositoryMock,
      saveUserRepositoryMock,
    )

    await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(saveSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
    })
  })
})
