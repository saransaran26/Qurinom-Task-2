import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../redux/userReducer";

function Login() {
  const [email, setname] = useState("");
  const dispatch = useDispatch()
  const [password, setpass] = useState("");
  const [err, seterr] = useState("");
  const [bool, setbool] = useState(false);
  const[loading,setloading] = useState(false)
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setloading(true)
    console.log("Clicked");
    
    try {
      const res = await axios.post("https://qurinom-task-2.onrender.com/user/login", {
        email,
        password,
      });
      setloading(false)
      navigate("/home");
      
      console.log(res.data.email);
      dispatch(adduser(res.data.email))
      
    } catch (error) {
      setloading(false)
      console.log(error.response.data.error);
      seterr(error.response.data.error);
      setbool(true);
      setTimeout(() => {
        setbool(false);
      }, 3000);
    }
    
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center ">
        <div>
          <div className="w-[400px] p-4 rounded-xl mt-28">
            <h2 className="text-4xl font-semibold text-center p-4 ">User Login</h2>
            {bool && <p className="my-4 text-red-600">{err}</p>}
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
              </button>:<button className="w-full bg-blue-400 p-3" onClick={handleForm}>
                Login
              </button>}
              <div className="my-4  flex">
                <p>Dont have an account?</p>
                <span
                  className="px-3 text-blue-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Register
                </span>
              </div>
              <div className="my-4  flex">
                <p>Login to admin?</p>
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

export default Login;