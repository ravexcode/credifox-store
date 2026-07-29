import { getUserController } from "@/code/controllers/api/user.controller";
import Response from "@/utils/responses";

export async function getUserService(token: string) {
  const res = await getUserController(token);

  if (res.error) return new Response(res.message, res.error, res.status).serverError();

  return new Response(res.message, undefined, res.status).ok(res.user);
}
