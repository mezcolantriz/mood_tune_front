import React from "react";
import "./Error.scss";

interface ErrorProps {
    message: string;
    onClose: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="error-popup">
            <div className="error-popup__content">
                <p>{message}</p>
                <button onClick={onClose} className="error-popup__close">Cerrar</button>
            </div>
        </div>
    );
};

export default Error;
