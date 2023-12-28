import React, { useState } from "react";
import Navbar from "./Navbar";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const[bool,setbool] = useState(false)
  

  const handleCreate = async () => {
    setbool(true)
    const payload = {
      name,
      quantity,
      price,
    };
    try {
      const res = await axios.post(
        "https://qurinom-task-2.onrender.com/product/postdata",
        payload
      );
      console.log(res.data);
      setbool(false)
      navigate("/adminhome");
    } catch (error) {
      setbool(false)
      console.log(error.data);
    }
  };

  return (
    <>
      <div className="max-w-[1150px] mx-auto">
        <div>
          <h1 className="font-semibold text-4xl text-center mt-8">
            Create new one to upload
          </h1>
        </div>
        {bool && <p className="text-3xl font-semibold text-red-600 my-5">Loading to upload please wait...</p>}

        <div className="flex flex-col">
          
          <input
            type="text"
            placeholder="Enter Product Name"
            className="bg-slate-100 p-3 rounded-lg my-3 mt-4"
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Available Quantity"
            className="bg-slate-100 p-3 rounded-lg my-3"
            onChange={(e) => setquantity(e.target.value)}
            required
/>
            <input
            type="text"
            placeholder="Enter Product price"
            className="bg-slate-100 p-3 rounded-lg my-3"
            onChange={(e) => setprice(e.target.value)}
            required
            />
        </div>
        
        <div className="mt-4 flex justify-center items-center">
          <button
            className="px-5 py-2 bg-black text-white rounded-md"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default Create;

//export default Create