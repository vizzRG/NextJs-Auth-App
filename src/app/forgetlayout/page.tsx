"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [userEmail,setUserEmail] = useState({
      email : ""
    })

    const [buttonDisabled,setButtonDisabled] = useState(true)

    const sendUserMail = async() =>{
      try {
        
          // console.log(userEmail)
          const response = await axios.post("/api/users/forgetlayout",userEmail)
          router.push('/login')
      } catch (error:any) {
          throw new Error(error.message)
      }    
    }
    useEffect(()=>{
        if(userEmail.email.length > 0){
            setButtonDisabled(false)
        }
    },[userEmail])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <div className="flex flex-col bg-[#204252] px-3 py-2 rounded-lg shadow-md mt-4 ">
        
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        value={userEmail.email}
        onChange={(e)=> setUserEmail({email:e.target.value})}
        className=" bg-black/40 mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
        <button
        onClick={sendUserMail}
        disabled = {buttonDisabled}
          className={`bg-blue-500 text-white p-2 rounded duration-75 ${buttonDisabled ? "cursor-not-allowed bg-blue-800" : "cursor-pointer  hover:bg-blue-400 active:bg-blue-700"}`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
