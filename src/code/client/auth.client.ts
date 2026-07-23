type SignInData = {
  tag: string;
  password: string;
};

export async function signIn(body: SignInData) {
  const res = await fetch(
    "/api/auth/sign-in", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "credifox-api-key": process.env.CREDIFOX_API_KEY!
      },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();

  return data;
}