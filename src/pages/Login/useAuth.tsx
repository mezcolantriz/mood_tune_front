import { useState, useEffect } from "react";
import { SPOTIFY_ME_URL } from "../../config";
import { makeRequestWithToken } from "../../utils/apiClient";
import { UserProfile } from "../../types/userData";

export function useAuth() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const accessToken = localStorage.getItem("access_token");
            const tokenExpiration = localStorage.getItem("token_expiration");

            if (!accessToken || !tokenExpiration || new Date().getTime() > parseInt(tokenExpiration)) {
                console.warn("⚠ Token expirado o inexistente. Redirigiendo a login...");
                localStorage.removeItem("access_token");
                localStorage.removeItem("token_expiration");
                setLoading(false);
                setUser(null);
                return;
            }

            fetchUser(accessToken);
        };

        const fetchUser = async (token: string) => {
            try {
                const response = await makeRequestWithToken(SPOTIFY_ME_URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error on request: ${response.status}`);
                }

                const data: UserProfile = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error :", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    return { user, loading };
}
