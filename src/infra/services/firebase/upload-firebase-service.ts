import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { randomUUID } from 'expo-crypto'

import {
  UploadTransactionDocumentService,
  UploadTransactionDocumentServiceResult,
} from '@/data/contracts/services'
import { storage } from '@/main/config/firebase'
import { uriToBlob } from '@/infra/utils'

export class UploadFirebaseService implements UploadTransactionDocumentService {
  async upload(uri: string): Promise<UploadTransactionDocumentServiceResult> {
    const fileName = randomUUID()
    const storageRef = ref(storage, `transaction-documents/${fileName}`)
    const blob = await uriToBlob(uri)
    const uploadTask = uploadBytesResumable(storageRef, blob)
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => reject(error),
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
          resolve({
            fileName,
            documentUrl: downloadUrl,
          })
        },
      )
    })
  }
}
