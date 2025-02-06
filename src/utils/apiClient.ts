import { SPOTIFY_REFRESH_URL } from "../config";

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(SPOTIFY_REFRESH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            return null;
        }

        const newTokens = await response.json();
        localStorage.setItem("access_token", newTokens.access_token);

        if (newTokens.refresh_token) {
            localStorage.setItem("refresh_token", newTokens.refresh_token);
        }

        const expirationTime = Date.now() + newTokens.expires_in * 1000;
        localStorage.setItem("token_expiration", expirationTime.toString());

        return newTokens.access_token;
    } catch (error) {
        console.error("❌ Error:", error);
        return null;
    }
};

export const makeRequestWithToken = async (url: string, options: RequestInit = {}) => {
    let accessToken = localStorage.getItem("access_token");
    const tokenExpiration = localStorage.getItem("token_expiration");

    if (!accessToken || !tokenExpiration || Date.now() >= parseInt(tokenExpiration, 10)) {
        accessToken = await refreshAccessToken();

        if (!accessToken) {
            throw new Error("The access token could not be renewed.");
        }
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            accessToken = await refreshAccessToken();

            if (!accessToken) {
                throw new Error("The access token could not be renewed after getting the 401 error.");
            }

            return await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        }

        return response;
    } catch (error) {
        console.error("❌ Error:", error);
        throw error;
    }
};
