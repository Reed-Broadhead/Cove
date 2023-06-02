import {setView, viewSlice} from '../app/view.js'
import { useDispatch, useSelector } from'react-redux'
import { setServer } from '../app/server';
import axios from 'axios';

import {React} from 'react';
function ServerCards({server}) {
    


    const dispatch = useDispatch()
    const onButton = async () => {
        const response = await axios.get(`/api/servers/${server.id}`)


        dispatch(setView('server'))
        dispatch(setServer(response.data.server))
    }
    
    
    return (
        <div>
            <button className=' border border-green-900 w-20 rounded-md shadow-2xl font-mono mb-1'
            onClick={() => onButton()}>{server.serverName.length <= 5 ? server.serverName : `${server.serverName.slice(0, 7)}..`} </button>
        </div>
    )
}

export default ServerCards;