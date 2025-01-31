import { useState, useEffect } from "react";
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
    const [currentIcon, setCurrentIcon] = useState<string>(icons[0]);

    useEffect(() => {
        const changeIcon = () => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            setCurrentIcon(randomIcon);
        };

        const iconInterval = setInterval(changeIcon, interval);
        return () => clearInterval(iconInterval);
    }, [interval]);

    return (
        <div className="loading-spinner">
            <i className={`icon ${currentIcon}`} />
            Loading ...
        </div>
    );
};

export default LoadingSpinner;
