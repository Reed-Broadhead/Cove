import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from '../app/user.js'


function CurrentRequests({data=[{senderName: 'no new request'}]}) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const accept = async (request) => {
        const res = await axios.patch(`/api/usersFriend`, {friendsOf: request.senderId})
        decline(request)
    }
    console.log({data})

    const decline = async (request) => { 
    axios.delete(`/api/request/${request.id}`, {data: {user: user.value.user}} )
    }

    const toDisplay = data.map((request) => {
        return (
        <>
        <h1 >{`request from: ${request.senderName}`}</h1>
        <div>
        <button onClick={() => accept(request)}className="bg-green-800 border border-green-950 border-10 rounded-sm shadow-md">accept</button>
        <button onClick={() => decline(request)}className="bg-green-800 border border-green-950 border-10 rounded-sm shadow-md">decline</button>
        </div>
        </>
        )
    })

    return (
        <>
        {toDisplay}
        </>
    )
}

export default CurrentRequests