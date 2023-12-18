import { FormEvent, useEffect } from "react";
import Form from "./Form";
import { redirect, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";

const RegisterPage = async () => {
    
    const session = await getServerSession()
    if(session){
        redirect('/')
    }
    // console.log(session?.user)
    
    return ( 
        <Form/>
     );
}
 
export default RegisterPage;