import { userModel } from "@/model/userModel";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DBconnection } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      await DBconnection();
      const isExistUser = await userModel.findOne({ email: user.email });

      if (!isExistUser) {
        const newUser = await userModel.create({
          email: user.email,
          username: user.name,
          profileImage: user.image,
        });
        user.id = newUser._id.toString()
      } else {
        user.id = isExistUser._id.toString()
      }
      return true;
    },

    jwt: ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session: ({session, token }) => {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
