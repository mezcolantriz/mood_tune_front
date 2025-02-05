import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tooltip.scss";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

const Tooltip = ({ text, children, link }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="tooltip" 
      ref={triggerRef} 
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setTimeout(() => setVisible(false), 200)}
    >
      <div 
        className="tooltip__btn"
        onClick={() => setVisible(!visible)}
      >
        {children}
      </div>

      {visible && (
        <div
          className="tooltip__content"
          ref={tooltipRef}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setTimeout(() => setVisible(false), 200)}
        >
          <p>{text}</p>
          {link && (
            <div className="mt-2">
              <Link to={link.href} className="tooltip__link">
                {link.text}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
