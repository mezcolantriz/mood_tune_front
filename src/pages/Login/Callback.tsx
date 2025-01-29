import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPOTIFY_CALLBACK_URL } from "../../config";
import { AuthResponse } from "./types";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🚀 Callback.tsx se ha montado");

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        localStorage.setItem("debug_code", code || "No code received");
        localStorage.setItem("debug_spotify_callback", SPOTIFY_CALLBACK_URL);

        if (code) {
            axios
                .get<AuthResponse>(`${SPOTIFY_CALLBACK_URL}?code=${code}`)
                .then((response) => {
                    console.log("✅ Respuesta del backend recibida:", response.data);

                    localStorage.setItem("debug_backend_response", JSON.stringify(response.data));

                    const { access_token, refresh_token, expires_in } = response.data;

                    if (access_token && refresh_token) {
                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", refresh_token);
                        localStorage.setItem("token_expiration", (new Date().getTime() + expires_in * 1000).toString());

                        window.location.href = "/"; // 🔹 Usamos `window.location.href` en lugar de `navigate("/")`
                    } else {
                        localStorage.setItem("debug_error", "Tokens inválidos recibidos");
                        window.location.href = "/login";
                    }
                })
                .catch((error) => {
                    localStorage.setItem("debug_error", JSON.stringify(error));
                    window.location.href = "/login";
                });
        } else {
            localStorage.setItem("debug_error", "No se recibió código de Spotify");
            window.location.href = "/login";
        }
    }, [navigate]);

    return <div>Procesando autenticación...</div>;
};

export default Callback;
