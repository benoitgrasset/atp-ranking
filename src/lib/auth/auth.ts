import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { Provider } from "next-auth/providers/index";
import Resend from "next-auth/providers/resend";
import { prisma } from "../prisma";

const githubClientId = process.env.GITHUB_CLIENT_ID || "";
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || "";

if (!githubClientId || !githubClientSecret) {
  throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set");
}

const providers: Provider[] = [
  Resend({
    from: process.env.EMAIL_FROM,
  }),
  GitHubProvider({
    clientId: githubClientId,
    clientSecret: githubClientSecret,
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "resend");

export const {
  handlers,
  signIn,
  signOut,
  auth: baseAuth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
});
