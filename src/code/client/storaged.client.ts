export async function getStoraged() {
  const res = await fetch(
    "/api/storaged", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "credifox-api-key": process.env.CREDIFOX_API_KEY!
      }
    }
  );

  return await res.json();
}

export async function createStoraged(data: Record<string, unknown>) {
  const res = await fetch("/api/storaged", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateStoraged(id: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/storaged/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function deleteStoraged(id: string) {
  const res = await fetch(`/api/storaged/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}

export async function getStoragedById(id: string) {
  const res = await fetch(
    `/api/storaged/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "credifox-api-key": process.env.CREDIFOX_API_KEY!
      }
    }
  );

  return await res.json();
}
