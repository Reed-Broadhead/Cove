import axios from 'axios'
function CurrentRequests({data=[{senderName: 'no new request'}]}) {

    const accept = () => {

    }
    console.log({data})
    const decline = async (request) => { 
        console.log(request.id)
        // fetch(`/api/removeRequest/${request.id}`, method: 'DELETE')
        axios.delete(`/api/request/${request.id}`)
    }

    const toDisplay = data.map((request) => {
        return (
        <>
        <h1 >{`request from: ${request.senderName}`}</h1>
        <div>
        <button onClick={() => accept()}className="bg-green-800 border border-green-950 border-10 rounded-sm shadow-md">accept</button>
        <button onClick={() => decline(request)}className="bg-green-800 border border-green-950 border-10 rounded-sm shadow-md">decline</button>
        </div>
        </>
        )
    })

    return (
        <>
        {toDisplay}
        </>
    )
}

export default CurrentRequests