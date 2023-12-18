"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

const Form = () => {
    const router = useRouter()
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await signIn('credentials',{
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: '/dashboard',
        })
        console.log({res})
        if(!res?.error){
            router.push('/');
            router.refresh();
        }
    }
    return ( 
        <form onSubmit={handleSubmit} className="flex flex-col w-60">
            <input className="text-black" type="email" name="email" placeholder="Username" />
            <input className="text-black" type="password" name="password" placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
     );
}
 
export default Form;