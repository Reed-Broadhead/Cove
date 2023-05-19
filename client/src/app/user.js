import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null,
}

export const userSlice = createSlice({ 
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        getUser: (state) => { 
            console.log(state.value)
            // return state
        } },
})

export const { setUser, getUser } = userSlice.actions

export default userSlice.reducer