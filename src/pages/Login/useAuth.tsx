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
                console.log("📡 Intentando obtener perfil del usuario...");

                const response = await makeRequestWithToken(SPOTIFY_ME_URL);

                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.status}`);
                }

                const data: UserProfile = await response.json();

                if (data && typeof data === "object") {
                    setUser(data);
                } else {
                    throw new Error("❌ Datos de usuario inválidos");
                }
            } catch (error) {
                console.error("❌ Error obteniendo perfil de usuario:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
