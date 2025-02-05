import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="relative inline-block" ref={triggerRef}>
      <div
        className="cursor-pointer"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setTimeout(() => setVisible(false), 200)}
        onClick={() => setVisible(!visible)}
      >
        {children}
      </div>

      {visible && (
        <div
          className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-lg py-2 px-3 shadow-lg w-max max-w-xs z-50"
          ref={tooltipRef}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <p>{text}</p>
          {link && (
            <div className="mt-2">
              <Link to={link.href} className="text-blue-400 underline hover:text-blue-300 text-xs">
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
