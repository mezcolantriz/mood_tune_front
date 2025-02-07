import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext/useLoading";

const Callback = () => {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();

    useEffect(() => {
        setIsLoading(true);

        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");
        const expiresIn = urlParams.get("expires_in");

        if (accessToken && refreshToken && expiresIn) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("token_expiration", (new Date().getTime() + parseInt(expiresIn) * 1000).toString());

            navigate("/welcome");
        } else {
            alert("Error en la autenticación. Inténtalo de nuevo.");
            navigate("/login");
        }
    }, [navigate, setIsLoading]);

    return <div>...</div>;
};

export default Callback;
