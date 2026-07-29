type ControllerReturn = {
  message: string;
  user?: {
    id: string;
    tag: string;
    name: string;
    uploaded: any[];
    logged_at: Date | null;
    created_at: Date;
  };
  error?: string;
  status: number;
};

import { verifyAuth } from "@/code/repository/api/auth";

export async function getUserController(token: string): Promise<ControllerReturn> {
  const verify = await verifyAuth(token) as any;

  if (verify.status >= 205) return verify as ControllerReturn;

  const { password, ...safeUser } = verify.user;

  return {
    message: "User retrieved",
    user: safeUser,
    status: 200,
  };
}
