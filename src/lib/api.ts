const isBrowser = typeof window !== "undefined";
const baseUrl = isBrowser ? "/api/v1" : process.env.API_URL;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const request = (path: string, options: RequestInit) =>
  fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let res = await request(path, options);

  if (res.status === 401 && isBrowser && path !== "/jwt") {
    const refreshed = await request("/jwt", { method: "POST" });
    if (refreshed.ok) res = await request(path, options);
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(data?.message || "Something went wrong", res.status);
  }

  return data as T;
}
