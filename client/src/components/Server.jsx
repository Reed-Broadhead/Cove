import ServerBar from "./ServerBar"
import { useState } from "react"
import ServerSettings from "./ServerSettings"

function Server({data}) {
    const [view, setView] = useState('message')
    
    const setToDisplay = (x) => {
        setView(x)
    }
    
    const toDisplay = {
        'message': 'Message',
        'settings': <ServerSettings data={data}/>
    }
   
    return (
        <div className="h-screen border border-red-500">
            <h1 className="top-0">{`server name:${data.value.serverName}  `}</h1>
            <ServerBar data={data} setToDisplay={setToDisplay}/>
            {toDisplay[view]}
        </div>
    )
}

export default Server