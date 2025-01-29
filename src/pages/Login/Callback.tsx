import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");
        const expiresIn = urlParams.get("expires_in");

        if (accessToken && refreshToken && expiresIn) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("token_expiration", (new Date().getTime() + parseInt(expiresIn) * 1000).toString());

            window.location.href = "/";
        } else {
            alert("Error en la autenticación. Inténtalo de nuevo.");
            navigate("/login");
        }
    }, [navigate]);

    return <div>Procesando autenticación...</div>;
};

export default Callback;
