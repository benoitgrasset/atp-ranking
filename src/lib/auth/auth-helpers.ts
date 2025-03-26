import { User } from "next-auth";
import { unauthorized } from "next/navigation";
import { baseAuth } from "./auth";

export const auth = async () => {
  const session = await baseAuth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const requiredAuth = async () => {
  const user = await auth();

  if (!user) {
    unauthorized();
  }

  return user;
};
