import { NextResponse } from "next/server"
import { hash } from 'bcrypt'
import { sql } from "@vercel/postgres"

export async function POST(req: Request) {
    try {
        const { email, password, fullname } = await req.json()

        console.log({ email, password, fullname })

        const hashedPassword = await hash(password, 10)
        const hashed = await hash("admin", 10)
        console.log(hashed)

        const role = "user"

        const response = await sql`
            INSERT INTO users (fullname, email, password, role)
            VALUES (${fullname},${email}, ${hashedPassword}, ${role})
        `;
    } catch (err) {
        console.log(err)
    }
    return NextResponse.json({ text: 'message' })
}