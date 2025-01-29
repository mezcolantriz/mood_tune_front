import { useState, useEffect } from "react";

import axios from "axios";

import { SPOTIFY_ME_URL, SPOTIFY_REFRESH_URL } from "../../config";
import { AuthResponse, UserProfile } from "./types";

export function useAuth() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");
            const tokenExpiration = localStorage.getItem("token_expiration");

            if (!accessToken || !refreshToken) {
                setLoading(false);
                return;
            }

            // Si el token ha expirado, renovarlo
            if (tokenExpiration && new Date().getTime() > parseInt(tokenExpiration)) {
                try {
                    const refreshResponse = await axios.post<AuthResponse>(SPOTIFY_REFRESH_URL, {
                        refresh_token: refreshToken,
                    });

                    const { access_token, expires_in } = refreshResponse.data;

                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("token_expiration", (new Date().getTime() + expires_in * 1000).toString());
                } catch (error) {
                    console.error("Error al refrescar el token", error);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("token_expiration");
                    setLoading(false);
                    return;
                }
            }

            // Obtener datos del usuario autenticado
            try {
                const userResponse = await axios.get<UserProfile>(SPOTIFY_ME_URL, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
                });

                if (userResponse.data && typeof userResponse.data === "object") {
                    setUser(userResponse.data);
                } else {
                    throw new Error("Datos de usuario inválidos");
                }
            } catch (error) {
                console.error("Error obteniendo perfil de usuario", error);
                setUser(null);
            }

            setLoading(false);
        };

        fetchUser();
    }, []);

    return { user, loading };
}

