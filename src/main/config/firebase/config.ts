import { initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { ENV } from '@/main/config'

const app = initializeApp({
  appId: ENV.APP_ID,
  projectId: ENV.PROJECT_ID,
  apiKey: ENV.API_KEY,
})

export const auth = initializeAuth(app)
