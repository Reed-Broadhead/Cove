import { useState, useEffect } from 'react'
import { Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Homepage from './components/Homepage.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {setUser} from './app/user'
import { ToastProvider, useToasts } from 'react-toast-notifications';

//  toast-notifications
const FormWithToasts = () => {
  const { addToast } = useToasts();

  const onSubmit = async value => {
    const { error } = await dataPersistenceLayer(value);

    if (error) {
      addToast(error.message, { appearance: 'error' });
    } else {
      addToast('Saved Successfully', { appearance: 'success' });
    }
  };

  return <form onSubmit={onSubmit}>...</form>;
};





function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    async function getResponse() {
      const response = await fetch('/api/check')
      const data = await response.json()
      return data
    }
    getResponse().then(data => {
      if (data) {
       dispatch(setUser(data)) 
      }
    })
   
   
  }, [])


  return (
    
      <ToastProvider>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
      </ToastProvider>

 
    
  )
}

export default App
