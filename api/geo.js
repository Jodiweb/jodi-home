function decodeCity(value) {
  if (!value) return "";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function GET(request) {
  return Response.json(
    {
      city: decodeCity(request.headers.get("x-vercel-ip-city")),
      state: request.headers.get("x-vercel-ip-country-region") || "",
      country: request.headers.get("x-vercel-ip-country") || "",
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
