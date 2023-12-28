import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";


function Home() {
  const navigate = useNavigate();
  const[data,setdata] = useState([])
  const[lbool,setlbool] = useState(false)
  const[del,setdel] = useState(false)
  const[buy,setbuy] = useState(false)
  const[final,setfinal] = useState([])
  const[bool,setbool] = useState(false)
 

  useEffect(()=>{
    setlbool(true)
    const findit = async()=>{
      const res = await axios.get('https://qurinom-task-2.onrender.com/product')
      console.log("ans",res.data);
      setdata(res.data)
      setfinal(res.data)
      setlbool(false)
    }
    findit()
  },[])

  const handleBuy = () => {
    setbuy(true)
    setTimeout(()=>{
        setbuy(false)
    },3000)
  }
  const filtered = (e) => {
        
    const filtereddatas = data.filter(f => f.name.toLowerCase().includes(e.target.value))
    console.log(filtereddatas);
    if(filtereddatas.length <= 0){
        
        console.log("if blog");
        setbool(true)
        setfinal(filtereddatas)
    }
    else{
        console.log("if ans",filtereddatas);
        setfinal(filtereddatas)
        setbool(false)
    }
}
  return (
    <>
      {!lbool ? <div className="max-w-[1150px] mx-auto">
        
        <div className="mt-6">
          <p className="text-3xl font-semibold">Product Storage App</p>
        </div>
        
        <p className="my-4 text-xl">In this app this is User account we can only view products but in Admin account we can do CRUD operation, if you want to add a product, logout a user account and login in as admin account</p>
        <input className='my-4 p-3 rounded-lg w-full border' placeholder='Search the products' onChange={filtered}></input>
        {buy && <p className="flex justify-center items-center my-4 text-xl bg-green-600 text-white p-2">Order Booked Succesfully</p>}
        <div className="flex justify-center items-center space-y-8 md:flex gap-x-24 gap-y-10 md:items-center flex-wrap mt-7">
        {final && final.map((datas)=>{
          return (
            <div key={datas._id} className="w-[300px] h-auto p-4 border hover:transform hover:scale-105 transition-transform shadow-xl">
              <p className="font-semibold my-2 text-center">Product name : {datas.name}</p>
              <p className="font-semibold my-2 text-center">Quantity : {datas.quantity}</p>
              <p className="font-semibold my-2 text-center">Price : ${datas.price}</p>
              <div className="flex justify-around my-4">
              <button className="bg-red-500 text-white hover:opacity-95 px-4 py-2 rounded-lg" onClick={handleBuy}>BUY NOW</button>
              </div>
            </div>
          )
        })}
        </div>
        {bool && <p className='text-3xl font-semibold text-center my-5'>No data found</p>}
      </div>:
      <div className="max-w-[1150px] mx-auto">
      <div className="mt-6">
      <p className="text-3xl font-semibold">Product Storage App</p>
    </div>
    
    <div className="flex justify-center items-center">
      <p className="text-5xl text-red-600">Loading....</p>
      </div>
      </div>
      }
    </>
  );
}

export default Home;