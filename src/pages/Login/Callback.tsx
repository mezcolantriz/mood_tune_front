import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPOTIFY_CALLBACK_URL } from "../../config";
import { AuthResponse } from "./types";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        console.log("🔄 Código recibido de Spotify:", code);
        console.log("📡 SPOTIFY_CALLBACK_URL usado en la petición:", SPOTIFY_CALLBACK_URL);

        if (code) {
            axios
                .get<AuthResponse>(`${SPOTIFY_CALLBACK_URL}?code=${code}`)
                .then((response) => {
                    console.log("✅ Respuesta del backend:", response.data);

                    const { access_token, refresh_token, expires_in } = response.data;

                    if (access_token && refresh_token) {
                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", refresh_token);
                        localStorage.setItem("token_expiration", (new Date().getTime() + expires_in * 1000).toString());

                        navigate("/");
                    } else {
                        throw new Error("Tokens inválidos recibidos");
                    }
                })
                .catch((error) => {
                    console.error("❌ Error en el callback:", error);
                    alert("Error al autenticar con Spotify. Inténtalo de nuevo.");
                    navigate("/login");
                });
        }
    }, [navigate]);

    return <div>Procesando autenticación...</div>;
};

export default Callback;
