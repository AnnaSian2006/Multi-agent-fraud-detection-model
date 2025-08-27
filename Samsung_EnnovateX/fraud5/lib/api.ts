// fraud5/lib/api.ts

export async function predictFraud(features: number[]) {
  const res = await fetch("http://127.0.0.1:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ features }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return res.json();
}
