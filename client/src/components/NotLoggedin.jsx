import React from 'react';
import { NavLink } from 'react-router-dom'

function NotLoggedIn() {

    return (
        <div>
        <h1 className='text-center text-green-500'>Start</h1>
         <NavLink to='/login' className='text-center text-green-500'>Login</NavLink>
         <NavLink to='/signup' className='text-center text-green-500'>Signup</NavLink>
         <button onClick={() => console.log(user.value)}>hi</button>
         <button onClick={() => dispatch(setUser(null))}>LogOut </button>
     </div>
    )
}

export default NotLoggedIn