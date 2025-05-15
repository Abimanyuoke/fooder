// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/cashier/dashboard", // Optional: custom login page
//     // error: "/login?error=auth",
//   },
// });

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// import type { DefaultSession } from "next-auth";

// declare module "next-auth" {
//     interface Session {
//         user: {
//             role?: string;
//         } & DefaultSession["user"];
//     }
//     interface User {
//         role?: string;
//     }
// }

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,

//     callbacks: {
//         // Tambahkan role ke JWT
//         async jwt({ token, account, user }) {
//             // Misalnya default semua Google user adalah CASHIER
//             if (account && user) {
//                 token.role = "CASHIER"; // Ganti sesuai logika kamu
//             }
//             return token;
//         },

//         // Tambahkan role ke session
//         async session({ session, token }) {
//             if (token && session.user) {
//                 session.user.role = typeof token.role === "string" ? token.role : undefined;
//             }
//             return session;
//         },
//     },
// });

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, account, user, profile }) {
            // Saat login pertama kali, isi data tambahan
            if (account && user) {
                token.role = "CASHIER"; // Default, atau ambil dari DB
                token.username = (profile && typeof (profile as any).given_name === "string"
                    ? (profile as any).given_name
                    : user.name?.split(" ")[0]); // contoh ambil nama depan
                token.email = user.email;
                token.picture = profile && (profile as any).picture;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.role = typeof token.role === "string" ? token.role : undefined;
                session.user.username = typeof token.username === "string" ? token.username : undefined;
            }
            return session;
        },
    },
});
export { handler as GET, handler as POST };


