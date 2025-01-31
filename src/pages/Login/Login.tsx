import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SPOTIFY_LOGIN_URL } from "../../config";

import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";

import  spotifyLogo  from "../../assets/images/spotifyLogo.svg";

import "./Login.scss";

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
            </div>
        </>
    );
};

export default Login;

