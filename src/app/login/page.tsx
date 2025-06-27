"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router= useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const onLogin = async () => {
    try {
        const response = await axios.post("api/users/login",user)
        toast.success("Login Success")
        router.push("/profile")
    } catch (error:any) {
      console.log("Loggin Failed",error.message)
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }

  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold">Login Page</h1>
      <div className="flex flex-col bg-[#204252] px-3 py-2 rounded-lg shadow-md mt-4 ">
        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className=" bg-black/40 mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="bg-black/40 mt-2 mb-4 p-2 border border-gray-300 rounded"
        />

        <button
          onClick={onLogin}
          disabled = {buttonDisabled}
          className={`bg-blue-500 text-white p-2 rounded duration-75 ${buttonDisabled ? "cursor-not-allowed bg-blue-800" : "cursor-pointer  hover:bg-blue-400 active:bg-blue-700"}`}
        >
          Login
        </button>
      </div>
      <div className="flex flex-col  mt-4">
        <div>

        <p className="text-gray-400 inline-block mr-2 ">Not have a account?</p>
        <Link href="/signup" className="text-blue-500 hover:underline">
          SignUp
        </Link>
        </div>
        <div>

        <p className="text-gray-400 inline-block mt-3 mr-2">Forgot Password?</p>
        <Link href="/forgetlayout" className="text-blue-500 hover:underline">
          Forget Password
        </Link>
        </div>
      </div>
    </div>
  );
}
