export const fetchUserData = async <T,>(): Promise<T> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Fetch Error:", error.message);
      throw new Error(
        error.message || "Failed to fetch data. Please try again later."
      );
    }
    throw new Error("Unknown error occurred while fetching data.");
  }
};
