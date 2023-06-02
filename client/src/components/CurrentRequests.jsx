import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from '../app/user.js'


function CurrentRequests({data}) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const accept = async (request) => {
        const res = await axios.patch(`/api/usersFriend`, {friendsOf: request.senderId})
        decline(request)
    }
    console.log(data)

    const decline = async (request) => { 
    axios.delete(`/api/request/${request.id}`, {data: {user: user.value.user}} )
    }
    
    const toDisplay = data.map((request) => {
        return (
        <>
        
        <div className='bg-green-500 flex flex-col items-center rounded-md mt-20 h-[400px]'>
        <h1 className='bg-teal-900  w-[200px] mt-5 text-center font-mono' >{`requestFrom:${request.senderName}`}</h1>
        <div className=" w-1/2 text-center mb-3">
        <button onClick={() => accept(request)}className="bg-green-800 border border-green-950 border-10 rounded-sm shadow-md font-mono">accept</button>
        <button onClick={() => decline(request)}className="bg-green-800 border border-green-950 border-10 rounded-sm shadow-md font-mono">decline</button>
        <div className='bg-teal-900 w-100 mt-2 h-[5px]'></div>
        </div>
        </div>
        </>
        )
    })

    const noRequests = ( 
        <div className='h-[400px] mt-20 bg-green-500 items-center flex flex-col shadow-lg '>
            <h1 className=" rounded-sm w-[165px] font-mono bg-teal-900 text-center mt-[15px] shadow-xl">noNewRequests</h1>
        </div>
    )

    return (
        <>
        {data.length > 0 ? toDisplay : noRequests }
        </>
    )
}

export default CurrentRequests