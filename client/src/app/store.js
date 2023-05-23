import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import viewReducer from './view'

console.log(userReducer)
export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer
}
})

