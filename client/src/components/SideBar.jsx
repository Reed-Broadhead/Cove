import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from'react-redux'
import {setUser} from '../app/user.js'
import {setView} from '../app/view'
import ServerCards from './ServerCards.jsx'
import Icons from './Icons'
import axios from "axios"

function SideBar() { 
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const view = useSelector(state => state.view)
    const remove = async () => {
        const resp = await fetch('api/logout')
        const data = await resp.json()
        return data
     }



    const logout = () => {
        remove()
        dispatch(setUser(null))}
    
    const serversIn = []
    user.value?.user.servers.forEach((server) => {
        if (!user.value?.user.ownedServers.some(owned => owned.id  === server.server.id)) {
        serversIn.push(server.server)``
        }
    })
    

    const all_servers = user.value?.user.ownedServers.concat(serversIn)
    
    
    const mappedServers = all_servers?.map((server) => {
        return <ServerCards server={server}>hi</ServerCards>
    })
    


    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col bg-green-700 text-green-100 shadow-sm items-center">
            
            <Icons data={'hi'}/>
            {mappedServers}
            <i>2</i>
            <i>3</i>
            <i>4</i>
            <i>5</i>
            <button onClick={() => dispatch(setView('friends'))} className='bottom-0'>friends</button>
            <button onClick={() => logout()} className='bottom-0'>Logout</button>

        </div>
    )

}

export default SideBar;