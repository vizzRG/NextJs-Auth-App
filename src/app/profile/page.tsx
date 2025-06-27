"use client";
import axios from "axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Loading");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      return NextResponse.json({ message: "User NOT logged out", status: 400 });
    }
  };

  const getUserDetails = async ()=>{
    const user:any = await axios.get("/api/users/me")
    setData(user.data.data._id)
  }

  useEffect(() => {
    getUserDetails();
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <p>Welcome to your profile!</p>
      <Link href={`/profile/${data}`} className={`bg-green-700 mt-4 text-2xl text-white p-2 rounded`}>
        {data}
      </Link>
      <hr />
      <button
        onClick={logout}
        className={`bg-blue-500 mt-4 text-2xl text-white p-2 rounded duration-75 hover:bg-blue-400 active:bg-blue-700 `}
      >
        Logout
      </button>
      
    </div>
  );
}
