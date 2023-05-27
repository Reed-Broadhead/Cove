import {setView, viewSlice} from '../app/view.js'
import { useDispatch, useSelector } from'react-redux'
import { setServer } from '../app/server';
import axios from 'axios';

import {React} from 'react';
function ServerCards({server}) {
    
    console.log(server)

    const dispatch = useDispatch()
    const onButton = async () => {
        const response = await axios.get(`/api/servers/${server.id}`)
        console.log(response.data)

        dispatch(setView('server'))
        dispatch(setServer(response.data.server))
    }
    
    
    return (
        <div>
            <button onClick={() => onButton()}>{server.serverName.length <= 5 ? server.serverName : `${server.serverName.slice(0, 7)}..`} </button>
        </div>
    )
}

export default ServerCards;