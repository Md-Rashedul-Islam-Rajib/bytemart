import bcrypt from 'bcrypt'; // Corrected import
import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          return null; // Invalid credentials
        }

        // Connect to database
        const db = await connectDB();
        const currentUser = await db?.collection("users").findOne({ email });

        if (!currentUser) {
          throw new Error("No user exists with this email");
        }

        // Compare password
        const passwordMatched = await bcrypt.compare(password, currentUser.password);
        if (!passwordMatched) {
          throw new Error("Incorrect password");
        }

        // Return the user object if successful
        return currentUser;
      }
    })
  ],
  callbacks: {
    
  },
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
