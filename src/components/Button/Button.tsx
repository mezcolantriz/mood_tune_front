import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "login";
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  icon,
  iconPosition = "left",
}) => {
  return (
    <button
      className={`btn btn--${variant} ${icon ? `btn--icon-${iconPosition}` : ""}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{text}</span>
      {icon && iconPosition === "right" && <span className="btn__icon">{icon}</span>}
    </button>
  );
};

export default Button;
