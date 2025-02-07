import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext/useLoading";
import { useFilteredTracks } from "../../context/FilteredTracksContext/useFilteredTracks";
import { useTranslation } from "react-i18next";

import "./WelcomePage.scss";

import Background from "../../components/Background/Background";
import Logo from "../../assets/images/greenMoodTune.svg";

const WelcomeScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isLoading } = useLoading();
    const { requestsCompleted } = useFilteredTracks();

    useEffect(() => {
        if (!isLoading && requestsCompleted) {
            navigate("/");
        }
    }, [isLoading, requestsCompleted, navigate]);

    return (
        <>
            <Background />
            <div className="welcome-screen">
                <div className="welcome-screen__logo">
                    <img src={Logo} alt="MoodTune Logo"/>
                </div>
                <h1 className="welcome-screen__title">{t('welcome.welcome')}</h1>
                <p className="welcome-screen__text">{t('welcome.preparing')}</p>
            </div>
        </>
    );
};

export default WelcomeScreen;
