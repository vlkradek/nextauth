"use client"
import { redirect } from "next/navigation";
import { FormEvent, useEffect } from "react"
import { useSearchParams } from "next/navigation";

const Form = () => {
    const searchParams = useSearchParams()
    if(searchParams.get('token') !== 'ahoj'){
        redirect('/')
    
    }
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await fetch('/api/auth/register',{
            method:'POST',
            body: JSON.stringify({
                fullname: formData.get('fullname'),
                email: formData.get('email'),
                password: formData.get('password'),
            })
        })
        console.log({res})
    }
    return ( 
        <form onSubmit={handleSubmit} className="flex flex-col w-60">
            <input className="text-black" type="text" name="fullname" placeholder="Full Name" />
            <input className="text-black" type="email" name="email" placeholder="Username" />
            <input className="text-black" type="password" name="password" placeholder="Password" />
            <input type="submit" value="Register" />
        </form>
     );
}
 
export default Form;