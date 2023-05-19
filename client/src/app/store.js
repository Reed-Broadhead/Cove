import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'

console.log(userReducer)
export const store = configureStore({
  reducer: {
    user: userReducer
}
})

