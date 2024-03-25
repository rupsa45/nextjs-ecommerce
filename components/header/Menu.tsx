'use client'

import useCartService from "@/lib/hooks/useCartStore";
import { useEffect, useState } from "react";
import Link from "next/link"
import React from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Menu=({})=>{
 const router=useRouter()
  const { items } = useCartService()
  const [mounted, setMounted] = useState(false)
  const[data,setData] =React.useState("Sign In")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    setMounted(true)
  },[])
  useEffect(() => {
    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/auth/users/me");
            setData(res.data.data.name);
            setIsLoggedIn(true); // User is logged in
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Error fetching user details");
        }
    };

    getUserDetails(); 
}, []);
const logout=async ()=>{
  try {
      await axios.get('/api/auth/users/logout')
      setIsLoggedIn(false); // User is logged out
      setData("Sign In"); // Reset username
      toast.success(  <b>Logged out successfully</b>)
      router.push('/')
  } catch (error) {
      toast.error("Error Logging Out")
  }
}
  return (
  <div>
    <ul className='flex items-stretch'>
        <li>
            <Link className='btn btn-ghost rounded-btn' href='/cart'>
                Cart 
                {
                  mounted && items.length !=0 &&(
                    <div className='badge badge-secondary'>
                        {items.reduce((a, c) => a + c.qty, 0)}{''}
                    </div>
                  )
                }
            </Link>
        </li>
        <li>
            <h2 >
            {
              isLoggedIn ?(
                <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-btn">
                {data}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
                >
                  <li>
                    <button 
                    onClick={logout}
                    type="button">Update Profile</button>
                  </li>
                  <li>
                    <button 
                    onClick={logout}
                    type="button">Order History</button>
                  </li>
                  <li>
                    <button 
                    onClick={logout}
                    type="button">Sign out</button>
                  </li>
                </ul>
                </div>
              </li>
              ) :
              (
                <Link href='/login' className="btn btn-ghost rounded-btn" type="button">
                SignIn
              </Link>
              )
            }
            </h2>
        </li>
    </ul>
  </div>
  )
}
export  default Menu
