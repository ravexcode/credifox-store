import { signIn } from "@/code/repository/api/auth";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import JWTSK from "@/constraints/jwt-secret";

import type User from "@/types/user";
import { Controller } from "@/interfaces/controller";
type SignInData = {
  tag: string;
  password: string;
}

export async function signInController(data: SignInData): Promise<Controller> {
  const user = await signIn(data.tag) as User;

  const matches = await bcrypt.compare(data.password, user.password);

  if(!matches) return {
    message: "Passwords don't match",
    error: "Unauthorized",
    status: 401
  };

  const token = jwt.sign(
    {
      id: user.id
    },
    JWTSK,
    {
      expiresIn: '15h'
    }
  );

  return {
    message: "Sign in successfully",
    data: token,
    status: 200
  }
}