import { useState, useEffect } from "react";
import { SPOTIFY_ME_URL } from "../../config";
import { makeRequestWithToken } from "../../utils/apiClient";
import { UserProfile } from "./types";

export function useAuth() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await makeRequestWithToken(SPOTIFY_ME_URL);

                if (!response.ok) {
                    throw new Error(`Error on request: ${response.status}`);
                }

                const data: UserProfile = await response.json();

                if (data && typeof data === "object") {
                    setUser(data);
                } else {
                    throw new Error("❌ Invalid user data");
                }
            } catch (error) {
                console.error("❌ Error :", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
