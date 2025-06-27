"use client"
import React,{useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";

export default function verifyEmailPage(){
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false )


    const verifyUserEmail = async()=>{
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            console.log(token)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    })

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            
            {verified && <p className="text-green-500">Email verified successfully! <Link href="/login">Login</Link></p>}
            {error && <p className="text-red-500">Error verifying email. Please try again.</p>}
        </div>
    )

}