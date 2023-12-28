import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { removeuser } from "../redux/userReducer";
import axios from "axios";

function Navbar() {
  const currentUser = useSelector((state)=>state.user.currentUser)
 
  console.log("redux",currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[nav,setnav] = useState(false)
  const[show,setshow] = useState(false)
  const[uabool,setuabool] = useState(false)
  const handleClick = () => {
    setnav(!nav)
  }
  const handleLogout = () => {
    dispatch(removeuser())
    navigate('/login')
  }

  const handleAdminClick = () => {
    setuabool(!uabool)
    navigate('/adminregister')
  }

  const handleUserClick = () => {
    setuabool(!uabool)
    navigate('/')
  }
  return (
    <div className="bg-black text-white w-full h-[85px] flex items-center px-8 justify-between">
      <div>
        <p className="font-semibold text-3xl">Product App</p>
      </div>
      {!currentUser?<ul className="hidden md:flex space-x-16">
        
        {uabool ? <li className="cursor-pointer hover:border-b-2" onClick={handleUserClick}>User Login</li> : <li className="cursor-pointer hover:border-b-2" onClick={handleAdminClick}>Admin Login</li>}
      </ul>:
      <div className="flex items-center space-x-16">
      <ul className="hidden md:flex space-x-16">
        <li onClick={handleLogout} className="cursor-pointer hover:border-b-2">Logout</li>
      </ul>
     
      </div>
      }

      <div className="md:hidden z-10 cursor-pointer" onClick={handleClick}>
        {!nav ? <FaBars className="text-2xl"/> : <MdCancel className="text-2xl"/>}
        
      </div>

      {/* absolute top-0 left-0 flex flex-col w-full h-screen justify-center items-center text-white bg-black text-4xl font-semibold */}
      {!currentUser?<ul className={!nav ? 'hidden' : 'absolute top-24 right-1'}>
      {uabool ? <li className="cursor-pointer hover:opacity-90 bg-red-600 text-white px-4 py-2 rounded-xl" onClick={handleUserClick}>User Login</li> : <li className="cursor-pointer hover:opacity-90 bg-red-600 text-white px-4 py-2 rounded-xl" onClick={handleAdminClick}>Admin Login</li>}
      </ul>:
      
      <ul className={!nav ? 'hidden' : 'absolute top-24 right-1 '}>
              <li onClick={handleLogout} className="cursor-pointer hover:opacity-90 bg-red-600 text-white px-4 py-2 rounded-xl">Logout</li>

    </ul>
      }
    </div>
  );
}

export default Navbar;