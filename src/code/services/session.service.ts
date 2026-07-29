import { cookies } from "next/headers";

const COOKIE_NAME = "session_token";
const COOKIE_MAX_AGE = 15 * 60 * 60;

export class SessionCacheManager {
  static async set(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  }

  static async get(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value ?? null;
  }

  static async delete(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
  }

  static async has(): Promise<boolean> {
    return (await this.get()) !== null;
  }
}