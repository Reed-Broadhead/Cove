import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import viewReducer from './view'
import serverReducer from './server'

console.log(userReducer)
export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    server: serverReducer
}
})

