import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
// import bcrypt from "bcryptjs";
import { db } from "~/server/db";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<any> {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
            console.log("invalid credentials");
          throw new Error("Invalid credentials");
          
        }
        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          
          if (!user || !user.password) {
            console.log("user not found");
            throw new Error("user not found");
          }

          const passwordIsCorrect = await compare(
            credentials.password,
            user.password,
          );

          if (!passwordIsCorrect) {
            console.log("Incorrect Passowrd");
            throw new Error("Incorrect Passowrd");
          }
          return user;
        } catch (err) {
          console.log(err);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id?.toString();
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id?.toString();
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
