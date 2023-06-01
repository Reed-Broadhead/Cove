import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import for states
import { useDispatch, useSelector } from'react-redux'
import {setUser} from '../app/user.js'
import {setView, viewSlice} from '../app/view.js'
import { setServer } from '../app/server.js'
// components import 
import Login from './Signup'
import SideBar from './SideBar'
import Friends from './Friends'
import Server from './Server.jsx'
import ServerRequests from './ServerRequest.jsx'
import { io } from 'socket.io-client'

function Start() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const view = useSelector(state => state.view)
    const server = useSelector(state => state.server)
    const dispatch = useDispatch()
    if(!user.value) {
        console.log(user.value)
        navigate('/')
    }



    const onButtonClick = () => { 
        console.log(user.value.user)
    }
   
    
    const viewDisplay = {
        "friends": <Friends friends={user.value?.user.friends} friendsOf={user.value?.user.friendsOf}/>,
        "server" : <Server data={server} />,
        "serverRequests": <ServerRequests data={user}/>,
    }
    
    return (
        <>
        <SideBar />
        <div className="flex justify-center items-center ml-16 h-screen w-[stretch] text-green-100 bg-green-400">
        
        
        {view.value ? viewDisplay[view.value] : <></>}
        <button onClick={() => onButtonClick()}>stuff</button>
        </div>
        
        </>
    )
}

export default Start

// dispatch(setUser(null))