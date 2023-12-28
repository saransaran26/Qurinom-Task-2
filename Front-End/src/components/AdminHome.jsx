import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";


function AdminHome() {
  const navigate = useNavigate();
  const[data,setdata] = useState([])
  const[lbool,setlbool] = useState(false)
  const[del,setdel] = useState(false)
  const[final,setfinal] = useState([])
  const[bool,setbool] = useState(false)
 

  useEffect(()=>{
    
    const findit = async()=>{
    setlbool(true)
      const res = await axios.get('https://qurinom-task-2.onrender.com/product')
      //console.log("ans",res.data);
      setdata(res.data)
      setfinal(res.data)
      setlbool(false)
    }
    findit()
  },[del])

  const handleDelete = async(id) => {
    console.log("Clicked");
    try {
      const res = await axios.delete(`https://qurinom-task-2.onrender.com/product/${id}`)
    console.log(res.data);
    setdel(true)
    setTimeout(()=>{
      setdel(false)
    },2000)
    
    } catch (error) {
      console.log(error);
    }
    
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
        <div className="my-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90"
            onClick={() => navigate("/create")}
          >
            Create +
          </button>
        </div>
        <input className='my-4 p-3 rounded-lg w-full border' placeholder='Search the products' onChange={filtered}></input>
        {del && <p className="flex justify-center items-center my-3 px-4 bg-red-500 text-white text-xl">Deleted Succesfully</p>}
        <div className="flex justify-center items-center md:flex gap-x-24 gap-y-10 md:items-center flex-wrap mt-7">
        {final && final.map((datas)=>{
          return (
            <div key={datas._id} className="w-[300px] h-auto p-4 border hover:transform hover:scale-105 transition-transform shadow-xl">
              <p className="font-semibold my-2 text-center">Product name : {datas.name}</p>
              <p className="font-semibold my-2 text-center">Quantity : {datas.quantity}</p>
              <p className="font-semibold my-2 text-center">Price : ${datas.price}</p>
              <div className="flex justify-around my-4">
              <button className="bg-green-600 text-white hover:opacity-95 px-4 py-2 rounded-lg" onClick={()=>navigate(`/update/${datas._id}`)}>Update</button>
              <button className="bg-red-600 text-white hover:opacity-95 px-4 py-2 rounded-lg" onClick={()=>handleDelete(datas._id)}>Delete</button>
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
    <div className="my-4">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90"
        onClick={() => navigate("/create")}
      >
        Create +
      </button>
    </div>
    <div className="flex justify-center items-center">
      <p className="text-5xl text-red-600">Loading....</p>
      </div>
      </div>
      }
    </>
  );
}

//export default Home;


export default AdminHome