'use client'

import axios from "axios"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import toast from "react-hot-toast"



export  default function Form(){
    const router=useRouter()
    const [user,setUser] =React.useState({
        email:"",
        password:"",
        name:""
    })
    const [buttonDisabled,setButtonDisabled] =React.useState(false)
    const [loading,setLoading] =React.useState(false)
    const onSignup=async()=>{
        try {
            toast.success("user created")
            setLoading(true)
            const response = await axios.post("api/auth/users/signup",user)
            console.log("signup success",response.data);
            router.push("/login")
            
        } catch (error) {
           toast.error("Error Occured")
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length >0  && 
            user.password.length >0 && 
            user.name.length>0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])
    return(
        <div className="max-w-sm  mx-auto card bg-base-300 my-4">
          <div className="card-body">
      
            <h1 className="text-center text-slate-200 text-2xl">{loading ? "Processing" : "signup" }</h1>
            
            <input
             className="input input-bordered w-full max-w-xs mt-3" 
             id="name"   
             type="text"
             value={user.name}
             onChange={(e)=>setUser({...user,name:e.target.value})}
             placeholder="username"
            />
            
            <input
             className="input input-bordered w-full max-w-xs" 
             id="email"   
             type="text"
             value={user.email}
             onChange={(e)=>setUser({...user,email:e.target.value})}
             placeholder="email"
            />
            
            <input
             className="input input-bordered w-full max-w-xs" 
             id="password"   
             type="password"
             value={user.password}
             onChange={(e)=>setUser({...user,password:e.target.value})}
             placeholder="password"
            />
            <button 
            onClick={onSignup}
            className="btn btn-primary mt-4">{buttonDisabled ? "No signup" : "Signup here"}</button>
            <Link href='/login' className="link">Visit login page</Link>
        </div>
      </div>
  
    )
}