import prisma from '../../../lib/prisma';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Password Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const dbUser = await prisma.user.findUnique({
                    where: {
                        name: credentials.username,
                    }
                })
                if (dbUser) {
                    if (dbUser.password == credentials.password) {
                        return dbUser
                    }
                } else {
                    return null
                }
            }
        })
    ],
    useSecureCookies: false,
}
export default NextAuth(authOptions)