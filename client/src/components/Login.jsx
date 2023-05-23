import {React} from 'react';
import {useFormik} from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
import { setUser} from '../app/user.js';
import { NavLink, useNavigate} from 'react-router-dom';


function Login() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(user.value)

    if (user.value){
        navigate('/homepage')
    }

    const formik = useFormik({
        initialValues: { 
            username: null,
            // nickname: null,
            email: null,
            password: null,
        },
        validationSchema: yup.object({
            username: yup.string().required('Must enter a name'),
            // nickname: yup.string().required('Must enter a nickname'),
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
        const resp = await fetch('/api/login', newUser);
        const data = await resp.json();
        dispatch(setUser(data))
        }catch (e) {
            return e
        }
        
    }

    return (
        <div class="flex justify-center bg-green-600 h-max rounded-md ">
        <h1 class=" text-center">login</h1>
        <form onSubmit={formik.handleSubmit} class="flex justify-center items-center h-screen" >
        <label> Username </label>
        <input id='username' name='username' value={formik.values.username} onChange={formik.handleChange} class="rounded-lg"/>
        <label>email </label>
        <input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} class="rounded-lg" />
        <label>Password </label>
        <input id="password" name="password" value={formik.values.password} onChange={formik.handleChange} class="rounded-lg border-spacing-7ss"/>
        <button type="submit" class=" bg-white w-20 rounded-lg border-solid border-9 border-orange-950">Save</button>
        </form>
        <NavLink to='/signup' className='text-center text-green-500'>Signup</NavLink>
        </div>
        
    )
}

export default Login;