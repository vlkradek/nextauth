"use client"
import { useSession } from "next-auth/react";
const DashboardPage = () => {
    const {data: session,status,update}  = useSession()
    // console.log(session)
    return ( 
        <p>{session?.user.role || 'not now'}</p>
     );
}
 
export default DashboardPage;