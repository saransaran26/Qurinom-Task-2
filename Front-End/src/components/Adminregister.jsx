import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Adminregister() {
  const [email, setname] = useState("");
  const [password, setpass] = useState("");
  const [err, seterr] = useState("");
  const [bool, setbool] = useState(false);
  const[loading,setloading] = useState(false)
  const[ubool,setubool] = useState(true)
  const[abool,setabool] = useState(false)
  const navigate = useNavigate();

  const handleForm = async (e) => {
    setloading(true)
    console.log("Clicked");
    e.preventDefault();
    try {
      const res = await axios.post("https://qurinom-task-2.onrender.com/admin/register", {
        email,
        password,
      });
      console.log(res.data);
      setloading(false)
      navigate("/adminlogin");
    } catch (error) {
      setloading(false)
      console.log(error.response.data);
      seterr(error.response.data);
      setbool(true);
      setTimeout(() => {
        setbool(false);
      }, 2000);
    }
  };

  

  return (
    <>
      <div className="w-full h-screen flex justify-center">
        <div>
          <div className="w-[400px]  p-4 rounded-xl mt-28">
            <h2 className="text-4xl font-semibold text-center p-4 ">
              Admin Register
            </h2>
            {bool && <p className="my-4 text-red-600">{err}</p>}
            {/* <div className="flex justify-around items-center my-3">
                <button className={`px-6 py-2 ${ubool ? 'bg-green-400 text-white hover:opacity-90' : 'bg-slate-200'} rounded-full`} onClick={handleUserLogin}>User login</button>
                <button className={`px-6 py-2 ${abool ? 'bg-green-400 text-white hover:opacity-90' : 'bg-slate-200'} rounded-full`} onClick={handleAdminLogin}>Admin login</button>
            </div> */}
            
            <form className="mt-5">
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="p-3 rounded-lg bg-slate-100 "
                  onChange={(e) => setname(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="p-3 rounded-lg bg-slate-100 my-5"
                  onChange={(e) => setpass(e.target.value)}
                  required
                />
              </div>
              {loading ? <button className="w-full bg-blue-300 p-3" onClick={handleForm}>
                Loading...
              </button> :<button className="w-full bg-blue-400 p-3" onClick={handleForm}>
                Register
              </button>}
              <div className="my-4  flex">
                <p>Already Have an account?</p>
                <span
                  className="px-3 text-blue-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/adminlogin")}
                >
                  Login
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

//export default Regsiter;

export default Adminregister