import React from "react";
import { useTranslation } from "react-i18next";
import { SPOTIFY_LOGIN_URL } from "../../config";
import { Link } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext/useLoading";

import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";
import spotifyLogo from "../../assets/images/spotifyLogo.svg";

import "./Login.scss";

const Login = () => {
    const { t } = useTranslation();
    const { setIsLoading } = useLoading();

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = SPOTIFY_LOGIN_URL;
    };

    return (
        <>
            <Background showFirst={true} showSecond={true} showThird={true} />
            <div className="login">
                <h1 className="login__text">
                    {t('login.slogan').split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </h1>
                <Button
                    text={t('login.login-button')}
                    onClick={handleLogin}
                    variant="login"
                    icon={<img src={spotifyLogo} alt="Spotify" width={20} height={20} />}
                    iconPosition="left"
                />
                <p className="login__policy">
                    <span className="icon icon-cookie"></span>
                    <span className="login__policy--text">
                        {t('login.login-policy-prefix')}
                        <Link to="/privacy-policy" className="login__policy--link">
                            {t('login.login-policy-link')}
                        </Link>
                    </span>
                </p>
            </div>
        </>
    );
};

export default Login;
