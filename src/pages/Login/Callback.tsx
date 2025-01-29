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

        if (code) {
            axios
                .get<AuthResponse>(`${SPOTIFY_CALLBACK_URL}?code=${code}`)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error("Error en la autenticación con Spotify");
                    }

                    const { access_token, refresh_token, expires_in } = response.data;
                    
                    // Guardar tokens solo si la respuesta es válida
                    if (access_token && refresh_token) {
                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", refresh_token);
                        localStorage.setItem("token_expiration", (new Date().getTime() + expires_in * 1000).toString());

                        navigate("/"); // Redirigir a home
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
