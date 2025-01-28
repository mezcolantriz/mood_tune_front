export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
  
    if (!refreshToken) {
      console.error("No refresh token disponible.");
      return null;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error("Error al renovar el token.");
      }
  
      const newTokens = await response.json();
      localStorage.setItem("access_token", newTokens.access_token);
  
      if (newTokens.refresh_token) {
        localStorage.setItem("refresh_token", newTokens.refresh_token);
      }
  
      // Calculate token new expiration
      const expirationTime = Date.now() + newTokens.expires_in * 1000;
      localStorage.setItem("token_expiration", expirationTime.toString());
  
      return newTokens.access_token;
    } catch (error) {
      console.error("Error al renovar el token:", error);
      return null;
    }
  };
  
  export const makeRequestWithToken = async (
    url: string,
    options: RequestInit = {}
  ) => {
    let accessToken = localStorage.getItem("access_token");
    const tokenExpiration = localStorage.getItem("token_expiration");
  
    // Verify if token has expired
    if (!accessToken || !tokenExpiration || Date.now() >= parseInt(tokenExpiration, 10)) {
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        throw new Error("No se pudo renovar el token de acceso.");
      }
    }
  
    // Request to updated token
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response;
  };
    