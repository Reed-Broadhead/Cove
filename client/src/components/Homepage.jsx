import React, { useEffect } from 'react'
import { useState } from 'react'
import Login from './Signup'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from'react-redux'
import { getUser, setUser} from '../app/user.js'
import MainSite from './MainSite'
function Start() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    if(user) {
        console.log(user.value)
    }
    return (
        <h1>hi</h1>
    )
}

export default Start