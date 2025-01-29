import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPOTIFY_CALLBACK_URL } from "../../config";
import { AuthResponse } from "../../types";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🚀 Callback.tsx se ha montado");

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        console.log("🔄 Código recibido de Spotify:", code);
        console.log("📡 SPOTIFY_CALLBACK_URL usado en la petición:", SPOTIFY_CALLBACK_URL);

        if (code) {
            console.log("📡 Enviando código al backend...");
            
            axios
                .get<AuthResponse>(`${SPOTIFY_CALLBACK_URL}?code=${code}`)
                .then((response) => {
                    console.log("✅ Respuesta del backend recibida:", response.data);

                    const { access_token, refresh_token, expires_in } = response.data;

                    if (access_token && refresh_token) {
                        console.log("💾 Guardando tokens en localStorage...");
                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", refresh_token);
                        localStorage.setItem("token_expiration", (new Date().getTime() + expires_in * 1000).toString());

                        console.log("✅ Tokens guardados. Redirigiendo a /...");
                        navigate("/"); // 🔹 Aquí se redirige a la pantalla principal
                    } else {
                        console.error("❌ Error: Tokens inválidos recibidos");
                        alert("Error en la autenticación. Inténtalo de nuevo.");
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    console.error("❌ Error en la petición a /auth/callback:", error);
                    alert("Error al autenticar con Spotify. Inténtalo de nuevo.");
                    navigate("/login");
                });
        } else {
            console.error("❌ No se recibió código de Spotify");
            alert("No se recibió código de autenticación. Inténtalo de nuevo.");
            navigate("/login");
        }
    }, [navigate]);

    return <div>Procesando autenticación...</div>;
};

export default Callback;
