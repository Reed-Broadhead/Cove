import axios from 'axios';

function ServerRequest({data}) {
    console.log(data.value.user.serverRequests)


    const declineRequest = async (request) => {
        // console.log(request)
        const req = await axios.delete(`/api/serverRequests/${request.id}`)
    }

    const acceptRequest = async (request) => { 
        console.log(request)
        const req = await axios.post('/api/userServer', {userId: request.receiverId, serverId: request.serverId})
        declineRequest(request)
    }

    const serverRequests = data.value.user.serverRequests.map((request) => {
        return (
        <div className="border w-3/4 text-center">
            <button className="border border-red-600  w-1/2 text-center" onClick={() => acceptRequest(request)}>{`join ${request.server.serverName}`}</button>
            <button  className="border border-blue-700 w-1/2" onClick={() => declineRequest(request)}>{`decline ${request.server.serverName}`}</button>
        </div>)
    })

    return (
        <div className="border h-screen w-1/3 flex flex-col items-center">
            <h1>server request</h1>
            {serverRequests}
        </div>
    )
}


export default ServerRequest