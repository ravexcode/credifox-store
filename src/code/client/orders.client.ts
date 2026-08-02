export async function createOrder(items: Record<string, unknown>[]) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  return await res.json();
}

export async function getOrders() {
  const res = await fetch("/api/orders", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
}

export async function getOrder(id: string) {
  const res = await fetch(`/api/orders/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
}
