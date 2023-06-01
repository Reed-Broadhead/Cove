import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../app/user.js";
import axios from 'axios';
import OwnerSettings from "./OwnerSettings.jsx";

function ServerSettings({data}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ownerSettings, setOwnerSettings] = useState(data.value.ownerId == user.value.user.id ? <OwnerSettings data={data}/>: null)

    const addFriend = async (friend) => {
        const res = await axios.post('/api/serverRequests', {serverId:  data.value.id, receiverId : friend.id })
    }
    const totalFriends = user.value.user.friendsOf.concat(user.value.user.friends)

    
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