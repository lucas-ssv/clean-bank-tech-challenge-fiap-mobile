import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserModel } from '@/domain/models/account'

type AuthState = {
  user: UserModel | null
}

const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
