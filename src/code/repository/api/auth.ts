import prisma from "@/lib/prisma";

import * as jwt from "jsonwebtoken";

import JWTSK from "@/constraints/jwt-secret";

import { UserPayload } from "@/interfaces/user.payload";

export async function verifyAuth(token: string) {
  const decoded = jwt.verify(token, JWTSK) as UserPayload;

  const invalid = {
    message: "Invalid token",
    error: "Unauthorized",
    status: 401
  }

  if(!decoded || !decoded.id) return invalid

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: decoded.id }
  })
  .catch((e) => {
    if(e instanceof Error) return {
      message: e.message,
      error: e.cause,
      status: 502
    };

    throw new Error("Auth error");
  });
  
  if(!user) return invalid;

  return {
    message: "Accessed!", //Esto no es util, pero es para mantener message como true siempre, incluyendo el status
    user: user,
    status: 200
  };
}

export async function signIn(tag: string, password: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { tag: tag }
  })
  .catch((e) => {
    if(e instanceof Error) return {
      message: e.message,
      error: e.cause,
      status: 502
    };

    throw new Error("Sign in error");
  });

  return user;
}