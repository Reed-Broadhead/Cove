import {Formik, FormikContext, useFormik, Form} from "formik"
import * as yup from "yup"
import {useEffect, useState} from "react"
import axios from "axios"
//  await axios.patch(`/api/usersFriend`, {friendsOf: request.senderId})

function CreateNewGroup({data}) {
    

    const addGroup = async (values) => {
        console.log(values)
        const newGroup = await axios.post('/api/groups', {name: values.groupName, serverId: data.id} )
    }


// formik 
    const formik = useFormik({
        initialValues: { 
            groupName: null
        },
        validationSchema: yup.object({
            groupName: yup.string().required().min(3, "group name needs to be more then three characters.").max(7, "group name cannot be more then seven characters.")
        }), onSubmit: (values) => {
            addGroup(values)
        }
    })

    return (
        <>
        <div className=" flex items-center justify-center border h-screen">
            <form className="text-gray-950 " onSubmit={formik.handleSubmit}> 
            <input id="groupName" name="groupName" value={formik.values.groupName} onChange={formik.handleChange}/>
            <button type="submit">enter name</button>
            </form>
        </div>
        </>
    )
}

export default CreateNewGroup