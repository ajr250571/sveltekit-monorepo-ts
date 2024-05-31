import prisma from "$lib/prisma"
import { SvelteKitAuth, type User } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"

export const { signIn, signOut, handle } = SvelteKitAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials: any) => {
                let user = await prisma.user.findFirst({
                    where: { email: credentials.email }
                })

                if (!user) {
                    throw new Error("User not found.")
                }

                return {
                    email: user.email,
                    password: user.password
                }
            },
        }),
    ],
})