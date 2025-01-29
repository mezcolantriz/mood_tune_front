import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SPOTIFY_LOGIN_URL } from "../../config";

import styles from "./Login.module.scss";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = SPOTIFY_LOGIN_URL;
    };

    return (
        <div className={styles.login}>
            <h1>Login with Spotify</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
