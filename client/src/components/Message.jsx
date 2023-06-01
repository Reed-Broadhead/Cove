import { io } from 'socket.io-client'
import {Formik, FormikContext, useFormik, Form} from "formik"
import * as yup from "yup"
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from'react-redux'
import {setMessages} from "../app/messages"

const socket = io("http://localhost:3000");


function Message({group, user}) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()
    // console.log(group.id)
    
    console.log(messages)


    const [stateMessages, setStateMessages] = useState(group.messages)

   
    useEffect(() => {
    console.log(messages)
        
    socket.connect();

    socket.on('receive_message', data => {
        console.log(data)
        setStateMessages(stateMessages.concat(data[0]));
        dispatch(setMessages(messages.value.concat(data[0])))
        socket.emit('new data', data[0])
    })
    socket.emit('join_room', group.id)

    }, [socket])


    const postMessage = async (data) => {
        // console.log(data)
        const newPost = await axios.post('/api/messages', {senderId: data.userId, groupId: data.room, content: data.data.content })
    }

    const toBeMapped = group.messages.concat(messages.value)
   
    const messagesByTime = toBeMapped.map((message) => {
        return ( 
            <div className="bg-green-700 w-2/3 shadow-md rounded-md mb-1">
            <h1 className="ml-1">{message.sender.username}</h1>
            <h1 className="ml-1">{message.content}</h1>
            </div>   
    )
    })
    

    const formik = useFormik({
        initialValues: {
            content: null
        },
        validationSchema: yup.object({
            content: yup.string().required().min(1, "must have enter text").max(200, "text cannot be larger then 200 characters")
        }), onSubmit: (values) => {
            
            const data = {content: values.content, sender: {username: user.username}}
            socket.emit("send_message", {data, room: group.id, userId: user.id})
            postMessage({data, room: group.id, userId: user.id})
        }        
    })

    return (
       
        <div className="border bg-green-500 border-blue-500 w-full h-full  ">
            <h1>hi</h1>
            <div>{messagesByTime}</div>

            <div className='bg-green-700 border absolute w-1/2 h-12 bottom-0 text-center mb-10'>
                <form className="text-gray-950 border flex" onSubmit={formik.handleSubmit}>
                    <button  type="submit" className="bg-gray-950 w-7 rounded-lg">hi</button>
                    <input className="flex left-0" id="content" name="content" value={formik.values.content} onChange={formik.handleChange}/>
                </form>
            </div>

        </div>
        
            
        
        
    )
}

export default Message