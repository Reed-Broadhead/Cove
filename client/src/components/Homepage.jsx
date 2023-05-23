import React, { useEffect } from 'react'
import { useState } from 'react'
import Login from './Signup'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from'react-redux'
import {setUser} from '../app/user.js'
import {setView, viewSlice} from '../app/view.js'
import SideBar from './SideBar'
import Friends from './Friends'

function Start() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const view = useSelector(state => state.view)
    const dispatch = useDispatch()
    if(!user.value) {
        console.log(user.value)
        navigate('/')
    }
    
    const viewDisplay = {
        "friends": <Friends friends={user.value?.user.friends} friendsOf={user.value?.user.friendsOf}/>
    }
    
    return (
        <>
        <SideBar />
        <div className="flex justify-center items-center ml-16 h-screen w-[stretch] text-green-100 bg-green-400">
        
        
        {view.value ? viewDisplay[view.value] : <></>}
        <button onClick={() => console.log(user.value)}>stuff</button>
        </div>
        
        </>
    )
}

export default Start

// dispatch(setUser(null))