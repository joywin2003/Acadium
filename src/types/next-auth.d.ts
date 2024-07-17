import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role: string;
      name: string;
      email: string;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    } & DefaultSession["session"];
  } 

  interface User {
    id?: string;
    role: string;
    name: string;
    email: string;
  }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string;
    role: string;
    name: string;
    email: string;
  }
}