import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            status: string;
            email: string;
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (!user) return null;

                // Simple check for demo purposes, 
                // in real app use bcrypt.compare(credentials.password, user.password)
                if (credentials.password === user.password) {
                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        status: user.status
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.status = (user as any).status;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role;
                (session.user as any).status = token.status;
            }
            return session;
        },
    },
});
