import ServerSettings from "./ServerSettings"
import Message from "./Message"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/user"
import CreateNewGroup from "./CreateNewGroup"
import ServerRequest from "./ServerRequest"

function ServerBar({data, setToDisplay}) {
    const user =  useSelector(state => state.user)

    const displaySettings = () => {
        setToDisplay(<ServerSettings data={data} />)
    }
    
    const onGroupClick = (group) => {
            setToDisplay(<Message  group={group} user={user.value.user}/>)   
    }

    const newGroup = () => {
        setToDisplay(<CreateNewGroup data={data.value} />)
    }



   

    const mappedGroups = data.value.groups.map((group) => {
        return <h1 onClick={() => onGroupClick(group)} className=" text-md" >{group.name}</h1>
    })


    return (
        <div className="fixed top-0 left-20 h-screen w-20 m0 flex flex-col
                        bg-green-500 text-green-100 shadow-sm items-center">
            <i>{data.value.serverName}</i>
            {mappedGroups}
            <i>1</i>
            <i>1</i>
            <i>1</i>
            {data.value.ownerId == user.value.user.id ? <button onClick={() => newGroup()}>newGroup</button> : null}
            <button onClick={() => displaySettings()}>settings</button>

        </div>
    )
}

export default ServerBar