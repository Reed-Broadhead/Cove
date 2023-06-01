import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/user"
import axios from "axios"
function OwnerSettings ({data}) {
    const currentUser = useSelector(state => state.user)
    // console.log(data.value.users, rentUser)
    
    const onRemove = async (user) => {
        const personToDelete = data.value.users.filter((people) => people.userId == user.id)
        const req = await axios.delete(`/api/userServer/${personToDelete[0].id}`)
    }
    const allUserButOwner = data.value.users.filter((el) => {
        if (el.user.id !== currentUser.value.user.id) { 
            console.log(el.user)
            return el.user
        }
    })
    console.log(allUserButOwner)
    const serverUsers = allUserButOwner.map(user => {
        return (
            <button key={user.user.id} onClick={() => onRemove(user.user)}
            className="border border-red-700">{`remove: ${user.user.username}`}</button>
        )
    })

    return (
        <>
        <h1>ownerSettings</h1>
        <div className=" flex flex-col">
        {serverUsers}
        </div>
        </>
    )
}

export default OwnerSettings