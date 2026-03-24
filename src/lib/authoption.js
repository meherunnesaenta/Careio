import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth"; // backend function

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (user) {
          return user; // login successful
        }
        return null; // login failed
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user; // attach user to token
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // attach user to session
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login?error=true", // optional: custom error page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET, // must set in .env
};