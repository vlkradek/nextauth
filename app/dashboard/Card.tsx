"use client"
import { useSession } from "next-auth/react"

export const Card = () => {
    const {data:session} = useSession()
    return (
        <div>Card</div>
    )
}
