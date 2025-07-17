import { configureStore } from '@reduxjs/toolkit'
import loanSlice from './slices/loanSlice'

export const store = configureStore({
  reducer: {
    loan: loanSlice,
  },
})

export default store