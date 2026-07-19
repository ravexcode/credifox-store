export async function getProducts() {
  const res = await fetch(
    "/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "credifox-api-key": process.env.CREDIFOX_API_KEY!
      }
    }
  );

  const data = await res.json();

  return data;
}