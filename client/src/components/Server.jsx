import ServerBar from "./ServerBar"
import { useState } from "react"
import ServerSettings from "./ServerSettings"


function Server({data}) {
    const [view, setView] = useState(null)
    
    const setToDisplay = (x) => {
        setView(x)
    }

   
    return (
        <div className="h-screen border w-2/3 border-red-500">
            {/* <h1 className="top-0">{`server name:${data.value.serverName}  `}</h1> */}
            <ServerBar data={data} setToDisplay={setToDisplay}/>
            {view}
        </div>
    )
}

export default Server