import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SPOTIFY_LOGIN_URL } from "../../config";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import  spotifyLogo  from "../../assets/images/spotifyLogo.svg";

import "./Login.scss";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = SPOTIFY_LOGIN_URL;
    };

    return (
        <>
            <Background showFirst={true} showSecond={true} showThird={true} />
            <div className="login">
                <h1 className="login__text">
                    Your moods,
                    <br />
                    your playlists.
                </h1>
                <Button
                    text="Login with Spotify"
                    onClick={handleLogin}
                    variant="login" 
                    icon={<img src={spotifyLogo} alt="Spotify" width={20} height={20} />}
                    iconPosition="left"
                />
                <p className="login__policy">
                    <span className="icon icon-cookie"></span>
                    <span className="login__policy--text">
                        By login, you agree to our{" "}
                        <Link to="/privacy-policy" className="login__policy--link">
                        Privacy Policy
                        </Link>
                        .
                    </span>
                </p>
            </div>
            {isLoading && <LoadingSpinner />}
        </>
    );
};

export default Login;

