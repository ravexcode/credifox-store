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

export async function createProduct(data: Record<string, unknown>) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateProduct(id: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(
    `/api/products/${id}`, {
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