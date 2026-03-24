import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth"; // backend function
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
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
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified;
      }
      return true;
    },
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