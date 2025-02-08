import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useLoading } from "../../context/LoadingContext/useLoading";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
    interval?: number;
}

const icons = [
    "icon-aggresive",
    "icon-angry",
    "icon-calm",
    "icon-cry",
    "icon-dizzy",
    "icon-electronic",
    "icon-funny",
    "icon-grin-wink",
    "icon-happy",
    "icon-joke",
    "icon-kiss",
    "icon-laugh",
    "icon-love",
    "icon-meh",
    "icon-sad",
    "icon-skull",
    "icon-surprise",
    "icon-tired",
    "icon-upbeat"
];

const LoadingSpinner = ({ interval = 1000 }: LoadingSpinnerProps) => {
    const { t } = useTranslation();
    const { isLoading } = useLoading();
    const [currentIcon, setCurrentIcon] = useState<string>(icons[0]);
    const [loadingMessage, setLoadingMessage] = useState(t('loading.loading'));

    useEffect(() => {
        const changeIcon = () => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            setCurrentIcon(randomIcon);
        };

        const iconInterval = setInterval(changeIcon, interval);
        return () => clearInterval(iconInterval);
    }, [interval]);

    useEffect(() => {
        if (isLoading) {
            const firstTimeout = setTimeout(() => {
                setLoadingMessage(t('loading.almost-here'));
            }, 5000);

            const secondTimeout = setTimeout(() => {
                setLoadingMessage(t('loading.little-more-time'));
            }, 10000);

            return () => {
                clearTimeout(firstTimeout);
                clearTimeout(secondTimeout);
            };
        } else {
            setLoadingMessage(t('loading.loading'));
        }
    }, [isLoading, t]);

    if (!isLoading) return null;

    return (
        <div className="loading-spinner">
            <i className={`icon ${currentIcon}`} />
            {loadingMessage}
        </div>
    );
};

export default LoadingSpinner;
