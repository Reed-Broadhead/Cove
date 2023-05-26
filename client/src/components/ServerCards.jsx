import {setView, viewSlice} from '../app/view.js'
import { useDispatch, useSelector } from'react-redux'
import { setServer } from '../app/server';


import {React} from 'react';
function ServerCards({server}) {
    
    const dispatch = useDispatch()
    const onButton = () => {
        dispatch(setView('server'))
        dispatch(setServer(server))
    }
    
    
    return (
        <div>
            <button onClick={() => onButton()}>{server.serverName.length <= 5 ? server.serverName : `${server.serverName.slice(0, 7)}..`} </button>
        </div>
    )
}

export default ServerCards;