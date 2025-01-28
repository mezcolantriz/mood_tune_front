import { makeRequestWithToken } from "./apiClient";

export const fetchPaginatedData = async (url: string): Promise<unknown[]> => {
    let results: unknown[] = [];
    let nextUrl = url;
  
    try {
      while (nextUrl) {
        const response = await makeRequestWithToken(nextUrl);
        if (!response.ok) {
          throw new Error("Error on getting data.");
        }
  
        const data = await response.json();
        results = results.concat(data.items);
        nextUrl = data.next;
      }
    } catch (error) {
      console.error("Error on paginate:", error);
    }
  
    return results;
};
