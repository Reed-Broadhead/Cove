
function ServerBar({data, setToDisplay}) {

    const displaySettings = () => {
        setToDisplay("settings")
    }
   

    const mappedGroups = data.value.groups.map((group) => {
        return <h1 className=" text-sm">{group.name}</h1>
    })

    return (
        <div className="fixed top-0 left-16 h-screen w-16 m0 flex flex-col
                        bg-green-500 text-green-100 shadow-sm items-center">
            <i>{data.value.serverName}</i>
            {mappedGroups}
            <i>1</i>
            <i>1</i>
            <i>1</i>
            <i>1</i>
            <button onClick={() => displaySettings()}>settings</button>

        </div>
    )
}

export default ServerBar