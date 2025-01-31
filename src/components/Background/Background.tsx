import React from "react";
import "./Background.scss";
import Pink from "../../assets/images/pinkLine.svg";
import Green from "../../assets/images/greenLine.svg";
import Yellow from "../../assets/images/yellowLine.svg";

interface BackgroundProps {
  showFirst?: boolean;
  showSecond?: boolean;
  showThird?: boolean;
}

const Background: React.FC<BackgroundProps> = ({
  showFirst = true,
  showSecond = true,
  showThird = true,
}) => {
  return (
    <div className="background">
      <div className="background-line pink-line">{showFirst && <img src={Pink} alt="Background Pink Line" />}</div>
      <div className="background-line green-line">{showSecond && <img src={Green} alt="Background Green Line" />}</div>
      <div className="background-line yellow-line">{showThird && <img src={Yellow} alt="Background Yellow Line" />}</div>
    </div>
  );
};

export default Background;
