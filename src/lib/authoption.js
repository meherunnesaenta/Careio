import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth"; // backend function
import GoogleProvider from "next-auth/providers/google";
import { connect } from "./dbconnect";

const collections = await connect('users');

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: { label: "Email", type: "text" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials,req) {
        const user = await loginUser(credentials);
        return user;
      },
    }),
  ],

   callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      const isExist = await collections.findOne({
        email: user.email,
        // provider:account?.provider
      })
      if (isExist)
        return true;
      const newUser = {
        provider: account?.provider,
        name: user.name,
        email: user.email,
        image: user.image,
        role: 'user'

      }

      const result = await collections.insertOne(newUser)

      return result.acknowledged
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token, user }) {
      if (token) {
        session.email = token?.email
        session.role = token?.role
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account?.provider === "google") {
          const dbuser = await collections.findOne({ email: user.email })
          token.email = dbuser?.email
          token.role = dbuser?.role
        }
        else {
          token.email = user?.email
          token.role = user?.role
        }

      }
      return token
    }
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