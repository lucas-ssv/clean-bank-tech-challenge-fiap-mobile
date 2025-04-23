import { randomUUID } from 'node:crypto'

import { UploadTransactionDocumentService } from '@/data/contracts/services'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(),
}))

class UploadFirebaseService implements UploadTransactionDocumentService {
  async upload(uri: string): Promise<string> {
    randomUUID()
    return ''
  }
}

describe('UploadFirebaseService', () => {
  it('should call randomUUID', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload('any_document_uri')

    expect(randomUUID).toHaveBeenCalled()
  })
})
