export const BASE_URL = "http://localhost:8000";

export const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // DELETE requests might not return JSON content
  if (options.method === "DELETE" && response.status === 204) {
    return undefined as T;
  }

  return response.json();
};
