
import { Route , Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './App.css'

import {Login, Register, HomePage, DashboardPage } from "./pages"
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';
function App() {
 
  const dispatch = useDispatch();
  
 
  
 useEffect(()=>{
    dispatch(checkIsLoggedIn());
  } , [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path= "/login" element={<Login />} />
        <Route path= "/register" element={<Register />} />
        <Route path= "/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </div>
   
  )
}

export default App
