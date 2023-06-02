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
    const [times, setTimes] = useState(0)
    const goToLogout = () => {
        alert('if you log out now you dad will die, pleas dont leave my site i wok hard fo diz')
        setTimes(1)
    }

    const logout = () => {
        remove()
        dispatch(setUser(null))}
    
    const serversIn = []
    user.value?.user.servers.forEach((server) => {
        if (!user.value?.user.ownedServers.some(owned => owned.id  === server.server.id)) {
        serversIn.push(server.server)
        }
    })
    

    const all_servers = user.value?.user.ownedServers.concat(serversIn)
    
    
    const mappedServers = all_servers?.map((server) => {
        return <ServerCards key={server.id} server={server}>hi</ServerCards>
    })
    


    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0
                        flex flex-col bg-green-700 text-green-100 shadow-sm items-center">
            
            <h1 className="bg-teal-950  w-20 text-center font-mono rounded-sm shadow-sm mb-1" >servers</h1>
            {mappedServers}
            <button className="bg-teal-900 rounded-sm shadow-sm mb-1 w-20 font-mono" onClick={() => dispatch(setView('friends'))} >friends</button>
            <button className="bg-teal-900 w-20 rounded-sm shadow-sm font-mono mb-1" onClick={() => dispatch(setView('serverRequests'))}>requests</button>
            <button className="bg-teal-900 w-20 rounded-sm font-mono text-md" onClick={() => dispatch(setView('makeServer'))}>newServer</button>
            <button className="bg-red-700 mt-20 w-20" onClick={() => times == 1 ? logout(): goToLogout()}>Logout</button>

        </div>
    )

}

export default SideBar;