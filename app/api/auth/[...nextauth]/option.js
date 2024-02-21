import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connectDB";
import User from "@/model/User";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      async authorize(profile) {
        await connectDB();
        console.log(profile)
        const { name, email } = profile;

        const existingUser = await User.findOne({
          email,
        });

        if (existingUser) {
          return existingUser;
        }

        const user = new User({
          name: name,
          email: email,
          fb_page: false,
        });

        try {
          await user.save();
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      }

    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {},
        email: {},
      },

      async authorize(credentials) {
        await connectDB();

        const { name, email } = credentials;

        const existingUser = await User.findOne({
          email,
        });

        if (existingUser) {
          return existingUser;
        }

        const user = new User({
          name: name,
          email: email,
          fb_page: false,
        });

        try {
          await user.save();
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }),
  ],
  callbacks: {},
};
