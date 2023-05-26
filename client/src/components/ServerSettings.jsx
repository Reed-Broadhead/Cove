import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../app/user.js";
import axios from 'axios';
import OwnerSettings from "./OwnerSettings.jsx";

function ServerSettings({data}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ownerSettings, setOwnerSettings] = useState(data.value.ownerId == user.value.user.id ? <OwnerSettings/>: null)


    const addFriend = async (friend) => {
        console.log(friend)
        const res = await axios.post('/api/userServer', {data: {userId : friend.id, serverId:  data.value.id }})
    }
    const totalFriends = user.value.user.friendsOf.concat(user.value.user.friends)

    
    console.log(data)

    const mappedFriends = totalFriends.map((friend) => {
        return (
        <div className=" flex items-center rounded-lg">
        <button onClick={() => addFriend(friend)} className=" bg-green-700  rounded-lg">{`add  ${friend.username}`}</button>
        
        </div>
        )
    })
    
    return (
        <>
        <div className="flex flex-col">
            <button onClick={() => console.log(user.value.user.friendsOf)}>Friends</button>
            {mappedFriends}
        </div>
        {ownerSettings}
        </>
    )
}

export default ServerSettings;