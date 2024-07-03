import CredentialsProvider from "next-auth/providers/credentials";
import page from "~/app/admin/page";
// import bcrypt from "bcryptjs";
import { db } from "~/server/db";

export const authOptions = {
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            throw new Error("user not found");
          }

          if (user.password !== credentials.password) {
            throw new Error("Incorrect Passowrd");
          }
          return user;
        } catch (err) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
