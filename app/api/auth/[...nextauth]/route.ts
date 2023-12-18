import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    // secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const res = await sql`
                    SELECT * FROM users WHERE email=${credentials?.email}
                `;
                const user = res.rows[0]

                // let userRole = 'user';
                // if (user.email == "radekvlk@radekvlk.cz") {

                // }

                const passwordCorrect = await compare(credentials?.password || '', user.password);

                // console.log({ passwordCorrect })
                console.log({ user })

                if (passwordCorrect) {
                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role

                        // role: userRole,
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // if (user) {
            // const administrators = ['radekvlk@radekvlk.cz']
            // token.isAdmin = 'ahoj';
            // console.log("jwt", { token, user, session })
            // }
            if (user) {
                token.role = user.role
            }
            return token;
        },
        async session({ session, token, user }) {
            // console.log("session", { session, token, user })
            if (session?.user) {
                session.user.role = token.role

            }
            return session
        }
    },
    pages: {
        signIn: '/login'
    },

})

export { handler as GET, handler as POST }