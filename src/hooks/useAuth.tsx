import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../utils/apiClient";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            let accessToken = localStorage.getItem("access_token");
            const tokenExpiration = localStorage.getItem("token_expiration");

            if (!accessToken || !tokenExpiration || Date.now() >= parseInt(tokenExpiration, 10)) {
                accessToken = await refreshAccessToken();
            }

            if (accessToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate("/login", { replace: true });
            }

            setLoading(false);
        };

        checkAuth();
    }, [navigate]);

    return { isAuthenticated, loading };
};

export default useAuth;
