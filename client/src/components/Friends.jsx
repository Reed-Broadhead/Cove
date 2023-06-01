import { useState } from "react";
import { useDispatch, useSelector } from'react-redux'
import {setUser} from '../app/user.js'
import {useFormik} from "formik"
import * as yup from "yup"
import CurrentRequests from "./CurrentRequests.jsx";

function Friends({friends=[], friendsOf=[]}) {
   
    const [newFriend, setNewFriend] = useState(null)
    const [view, setView] = useState('Friends')
    const totalFriends = friends.concat(friendsOf);
    const user = useSelector(state => state.user)

    const createRequest = async (data) => {
        
        // console.log(user.value?.user.id);
        const requests = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({senderName: user.value.user.username ,senderId:user.value.user.id, receiverId: data.user.id})
        }
        const resp = await fetch('/api/request', requests)
        const respData = await resp.json()
        return respData
    }


    const handleGet = async (values) => {
        const name = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }

        const resp = await fetch('/api/getFriends', name)
        const data = await resp.json();
        createRequest(data)
    }

    const formik = useFormik({
        initialValues: { 
            username: null,
        },
        validateSchema: yup.object({
            username: yup.string().required('Must enter a name')
        }),
        onSubmit: async (values, helpers) => {
            handleGet(values)
            helpers.resetForm()
        }
    })



    const getNewFriend = () => {
        if (newFriend){
            setNewFriend(null)
        }else{
        setNewFriend(
            <div onSubmit={formik.handleSubmit} className="bg-blue-900 top-10 border h-1/2 w-1/2 text-center items-center fixed">
                <h1>Enter Username</h1>
                <form>
                    <input type="text" id="username" name="username" onChange={formik.handleChange}
                    className="rounded-md text-black"></input>
                    <button type="submit">request</button>
                </form>
                 <button type="submit" onClick={() => createRequest({id: 10})} >test </button>
            </div>
        )}
    }

    const mappedFriends = totalFriends.map((friend) => {
        return <h1>{friend.username.length < 10 ? friend.username: `${friend.username.slice(0, 7)}...` }</h1>
    })

    // const outGoingRequest = 

    const toDisplay = {
        "Friends": mappedFriends,
        "FriendRequests": <CurrentRequests data={user.value.user.requests}/>
    }

    return (
        <>
        {newFriend}
        <div className="bg-green-500 fixed top-0 left-20 h-screen w-20 text-center">
            <h1 className="bg-green-600 rounded-md text-left ">friends</h1>
            {toDisplay["Friends"]}
            <button onClick={() => setView('FriendRequests')} >Requests</button>
            <button className="bg-green-600 rounded-md bottom-0" onClick={() => getNewFriend()}>add friend</button>
        </div>
        <div className=" w-[40%] border border-red-400">
        {toDisplay[view]}
        </div>
        

        </>
    )
}

export default Friends