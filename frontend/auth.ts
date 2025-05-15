// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id?: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, token }) {
//       // Menambahkan ID user ke session
//       if (token && session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})
