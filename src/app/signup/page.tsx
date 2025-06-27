"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [loading,setLoading]= React.useState(false)

  useEffect(() => {
      if(user.email.length > 0 && user.password.length> 0 && user.username.length > 0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    
  }, [user])
  

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log("Signup Success",response.data)
      router.push('/login')
    } catch (error: any) {
      console.log("Signup Failed",error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold">{loading?"Processing...":"Signup Page"}</h1>
      <p>Please sign up to access the application.</p>

      <div className="flex flex-col bg-[#204252] px-3 py-2 rounded-lg shadow-md mt-4 ">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="bg-black/40 mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
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
          onClick={onSignup}    
          disabled={buttonDisabled}
          className={`bg-blue-500 text-white p-2 rounded duration-75 ${buttonDisabled ? "cursor-not-allowed bg-blue-800" : "cursor-pointer  hover:bg-blue-400 active:bg-blue-700"}`}
        >
          Sign Up
        </button>
        
      </div>
      <div className="flex  mt-4">

        <p className="text-gray-400 inline-block mr-2">Already have an account?</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
