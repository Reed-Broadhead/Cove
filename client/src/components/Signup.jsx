import React, { useEffect } from 'react'
import { useState } from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
function Login() {
    // useEffect(() => {
    // async function FetchUsers() {
    //     const response = await fetch('http://localhost:5000/signup')
    //     const users = await response.json();
    //     return users
    // }
    // FetchUsers().then((users) => console.log(users))
    // }, [])

    const formik = useFormik({
        initialValues: { 
            username: null,
            nickname: null,
            email: null,
            password: null,
        },
        validationSchema: yup.object({
            username: yup.string().required('Must enter a name'),
            nickname: yup.string().required('Must enter a nickname'),
            email: yup.string().required('Must enter a email'),
            password: yup.string().required('Must enter a password'),
        }),
        onSubmit: async (values, helpers) => {
            handlePatch(values)
            helpers.resetForm()
        }
    })

    const handlePatch = async (values, helpers) => {
        console.log(values)
        const newUser = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }
        try {
        const resp = await fetch('/api/signup', newUser);
        const data = await resp.json();
        return data
        }catch (e) {
            return e
        }
    }

    return (
        <div className="color-green">
        <h1>hi there</h1>
        <form onSubmit={formik.handleSubmit} >
        <label> Username</label>
        <input id='username' name='username' value={formik.values.username} onChange={formik.handleChange} />
        <label>nickname</label>
        <input id='nickname' name='nickname' value={formik.values.nickname} onChange={formik.handleChange} />
        <label>email</label>
        <input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
        <label>Password</label>
        <input id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
        <button type="submit">Save</button>
        </form>
        </div>
    )
}

export default Login;