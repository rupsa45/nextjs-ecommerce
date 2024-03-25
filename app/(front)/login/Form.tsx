'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import toast from "react-hot-toast"



export default function Form(){
    const router =useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled] =React.useState(false)
    const [loading,setLoading] =React.useState(false)
    const onLogin=async()=>{
        try {
            toast.success("User created")
            setLoading(true)
            const response = await axios.post("api/auth/users/login",user)
            console.log("Login success",response.data);
            router.push("/")
        } catch (error) {
            toast.error("Error Occured")
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length >0  && 
            user.password.length >0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])
    return(
        <div className="max-w-sm  mx-auto card bg-base-300 my-4">
            <div className="card-body">
                <div>
                    <h1 className="text-center text-slate-200 text-2xl">
                        {loading ? "Processing":"Login"}
                    </h1>
                    <input
                    className="input input-bordered w-full max-w-xs my-6" 
                    id="email"   
                    type="text"
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    placeholder="email"
                    />
                    
                    <input
                    className="input input-bordered w-full max-w-xs my-4" 
                    id="password"   
                    type="password"
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    placeholder="password"
                    />
                    <button 
                    onClick={onLogin}
                    className="btn btn-primary mt-4 w-full mb-2">Login here</button>
                    <div className='text-center'>
                        Don&apos;t have an account?{' '}
                        <Link className="link text-blue-600" href='/signup'>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}