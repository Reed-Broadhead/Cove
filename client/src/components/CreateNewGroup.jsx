import {Formik, FormikContext, useFormik, Form} from "formik"
import * as yup from "yup"
import {useEffect, useState} from "react"
import axios from "axios"


function CreateNewGroup({data}) {
    
// formik 
    const formik = useFormik({
        initialValues: { 
            groupName: null
        },
        validationSchema: yup.object({
            groupName: yup.string().required().min(3, "group name needs to be more then three characters.").max(7, "group name cannot be more then seven characters.")
        }), onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <>
        <div>
            <form className="text-gray-950" onSubmit={formik.handleSubmit}> 
            <input id="groupName" name="groupName" value={formik.values.groupName} onChange={formik.handleChange}/>
            <button type="submit">enter name</button>
            </form>
        </div>
        </>
    )
}

export default CreateNewGroup