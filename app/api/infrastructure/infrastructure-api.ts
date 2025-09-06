export const get = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/infrastructure`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!result.ok) {
      const message =
        result.statusText ||
        `Failed to fetch infrastructure data with status ${result.status}`;
      throw new Error(message);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching infrastructure data:", error);
    return {
      error: true,
      message: error.message,
    };
  }
};
