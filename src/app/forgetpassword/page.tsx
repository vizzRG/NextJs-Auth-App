"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [userPassword,setUserPassword] = useState({
        password :'',
        confirmPassword : '',
        token : ''
    })

    const [buttonDisabled,setButtonDisabled] = useState(true)

    const updatePassword = async()=>{
        try {
            await axios.post("/api/users/forgetpassword",userPassword)
            router.push("/login")
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

     useEffect(()=>{
            const urlToken = window.location.search.split("=")[1]
            setUserPassword({...userPassword, token : urlToken})
        },[])
    useEffect(()=>{
        if(userPassword.password.length > 0 && userPassword.confirmPassword.length>0){
            setButtonDisabled(false)
        }
    },[userPassword])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <div className="flex flex-col bg-[#204252] px-3 py-2 rounded-lg shadow-md mt-4 ">
        
        <label htmlFor="Password">New Password</label>
        <input 
        type="password" 
        value={userPassword.password}
        onChange={(e)=> setUserPassword({...userPassword, password : e.target.value})}
        className=" bg-black/40 mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
        type="password" 
        value={userPassword.confirmPassword}
        onChange={(e)=> setUserPassword({...userPassword,confirmPassword : e.target.value})}
        className=" bg-black/40 mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
        <button
        onClick={updatePassword}
          className={`bg-blue-500 text-white p-2 rounded duration-75 ${buttonDisabled ? "cursor-not-allowed bg-blue-800" : "cursor-pointer  hover:bg-blue-400 active:bg-blue-700"}`}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
