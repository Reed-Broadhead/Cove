import ServerSettings from "./ServerSettings"
import Message from "./Message"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../app/user"
import CreateNewGroup from "./CreateNewGroup"
import ServerRequest from "./ServerRequest"
import {io} from 'socket.io-client'

const socket = io("http://localhost:3000");

function ServerBar({data, setToDisplay}) {
    const user =  useSelector(state => state.user)

    useEffect(() => {
        socket.connect();

    }, [socket])


    const displaySettings = () => {
        setToDisplay(<ServerSettings data={data} />)
    }
    
    const onGroupClick = (group) => {
            socket.emit('leave_room')
            socket.emit('join_room', group.id)
            setToDisplay(<Message  group={group} user={user.value.user} socket={socket}/>)   
    }

    const newGroup = () => {
        setToDisplay(<CreateNewGroup data={data.value} />)
    }



   

    const mappedGroups = data.value.groups.map((group) => {
        return <h1 onClick={() => onGroupClick(group)} className="bg-teal-900 rounded-md w-20 text-center shadow-lg text-md font-mono mb-1" >{group.name}</h1>
    })


    return (
        <div className="fixed top-0 left-[81px] h-screen w-20 m0 flex flex-col
                        bg-green-500 text-green-100 shadow-sm items-center">
            <i className="bg-teal-950 w-20 text-center rounded-sm shadow-sm mb-1">{data.value.serverName}</i>
            {mappedGroups}
            {data.value.ownerId == user.value.user.id ? <button onClick={() => newGroup()}>newGroup</button> : null}
            <button className="bg-green-700 w-20 font-mono" onClick={() => displaySettings()}>settings</button>

        </div>
    )
}

export default ServerBar