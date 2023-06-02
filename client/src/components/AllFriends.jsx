import { useDispatch, useSelector } from "react-redux"
import {setUser} from "../app/user"


function AllFriends({totalFriends}) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    console.log(user)
    const removeFriend = (friend) => [
        console.log(friend)
    ]

    const mappedFriends = totalFriends.map((friend) => {
        return (
        <div className="w-1/2 bg-green-700 rounded-md shadow-lg flex ">
        <h1 className=" rounded-md bg-green-700 w-1/2  font-mono  ml-20 "
        >{friend.username.length < 10 ? friend.username: `${friend.username.slice(0, 7)}...` }</h1>
        <h1 className="bg-red-700 w-15 right-0 rounded-sm font-mono" onClick={() => removeFriend(friend)}>remove</h1>
        </div>
        )
    })

    return(
        <div className="bg-green-500 h-[400px] text-center flex flex-col mt-20 rounded-md shadow-xl items-center">
            <h1 className="bg-teal-900 rounded-md w-24 mb-1 font-mono" > myFriends</h1>
            {mappedFriends}
        </div>
    )
}

export default AllFriends