import { randomUUID } from 'node:crypto'

import { UploadTransactionDocumentService } from '@/data/contracts/services'
import { ref } from 'firebase/storage'
import { storage } from '@/main/config/firebase'
import { uriToBlob } from '@/infra/utils'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('any_filename'),
}))

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  setPersistence: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn().mockResolvedValue({ id: 'any_transaction_id' }),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
}))

jest.mock('@/main/config/firebase', () => ({
  storage: 'mocked_storage',
}))

jest.mock('@/infra/utils', () => ({
  uriToBlob: jest.fn(),
}))

class UploadFirebaseService implements UploadTransactionDocumentService {
  async upload(uri: string): Promise<string> {
    const fileName = randomUUID()
    ref(storage, `transaction-documents/${fileName}`)
    await uriToBlob(uri)
    return ''
  }
}

describe('UploadFirebaseService', () => {
  it('should call randomUUID', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload('any_document_uri')

    expect(randomUUID).toHaveBeenCalled()
  })

  it('should call ref with correct values', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload('any_document_uri')

    expect(ref).toHaveBeenCalledWith(
      storage,
      'transaction-documents/any_filename',
    )
  })

  it('should call uriToBlob with correct uri', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload('any_document_uri')

    expect(uriToBlob).toHaveBeenCalledWith('any_document_uri')
  })
})
