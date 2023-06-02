import { useState } from "react";
import { useDispatch, useSelector } from'react-redux'
import {setUser} from '../app/user.js'
import {useFormik} from "formik"
import * as yup from "yup"
import CurrentRequests from "./CurrentRequests.jsx";
import AllFriends from "./AllFriends.jsx";

function Friends({friends, friendsOf}) {
   
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
    const toDisplay = {
        "Friends": <AllFriends totalFriends={totalFriends} />,
        "FriendRequests": <CurrentRequests data={user.value.user.requests}/>
    }

    return (
        <>
        {newFriend}
        <div className="bg-green-500 fixed top-0 left-[82px] h-screen w-[100px] text-center">
            <button className="bg-teal-900 rounded-md text-center w-[100px] shadow-md font-mono" onClick={() => setView('Friends')}>friends</button>
            <button className='w-[100px] rounded-md bg-teal-900 mt-1 mb-1 shadow-md font-mono' onClick={() => setView('FriendRequests')} >Requests</button>
            <button className="bg-teal-900 rounded-md bottom-0 w-[100px] shadow-md font-mono" onClick={() => getNewFriend()}>addFriend</button>
        </div>
        <div className=" w-[40%] h-screen ">
        {toDisplay[view]}
        </div>
        

        </>
    )
}

export default Friends