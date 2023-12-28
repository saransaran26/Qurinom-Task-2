import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Regsiter from './components/Regsiter'
import Login from './components/Login'
import Adminregister from './components/Adminregister'
import Adminlogin from './components/Adminlogin'
import Home from './components/Home'
import AdminHome from './components/AdminHome'
import Create from './components/Create'
import Update from './components/Update'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Regsiter/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/update/:id' element={<Update/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/adminregister' element={<Adminregister/>}/>
      <Route path='/adminlogin' element={<Adminlogin/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
