import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "github" && account.access_token) {
        const githubProfile = profile as any;  // CHANGE THIS LINE
        if (githubProfile?.login) {           // AND THIS LINE
          await prisma.user.update({
            where: { email: profile?.email as string },
            data: {
              githubLogin: githubProfile.login as string,  // AND THIS LINE
              githubToken: account.access_token,
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
};