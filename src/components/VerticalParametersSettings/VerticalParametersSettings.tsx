import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltip/Tooltip";
import "./VerticalParametersSettings.scss";

const SETTINGS = [
  "male",
  "danceable",
  "tonal",
  "timbre_bright",
  "instrumental",
  "mood_acoustic",
  "mood_aggressive",
  "mood_electronic",
  "mood_happy",
  "mood_party",
  "mood_relaxed",
  "mood_sad",
];

const SETTINGS_ICONS: { [key: string]: string } = {
    male: "icon-voice",
    danceable: "icon-dance",
    tonal: "icon-music",
    timbre_bright: "icon-bright",
    instrumental: "icon-piano",
    mood_acoustic: "icon-acoustic",
    mood_aggressive: "icon-sword",
    mood_electronic: "icon-electronic",
    mood_happy: "icon-happy",
    mood_party: "icon-party",
    mood_relaxed: "icon-leaf",
    mood_sad: "icon-cry",
};
  
const VerticalParametersSettings = () => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<{ [key: string]: number }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<string | null>(null);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("moodtune_settings");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    } else {
      const defaultPreferences = SETTINGS.reduce((acc, setting) => {
        acc[setting] = 50;
        return acc;
      }, {} as { [key: string]: number });
      setPreferences(defaultPreferences);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(preferences).length > 0) {
      localStorage.setItem("moodtune_settings", JSON.stringify(preferences));
    }
  }, [preferences]);

  const smoothSetValue = (setting: string, newValue: number) => {
    requestAnimationFrame(() => {
      setPreferences((prev) => ({
        ...prev,
        [setting]: Math.max(0, Math.min(100, newValue)),
      }));
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, setting: string) => {
    setIsDragging(true);
    setCurrentSetting(setting);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !currentSetting) return;

    const bar = document.getElementById(`bar-${currentSetting}`);
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const newValue = Math.round(100 - (clickY / rect.height) * 100);

    smoothSetValue(currentSetting, newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentSetting(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="vertical-parameters-settings">
      <div className="vertical-parameters-settings__container">
        {SETTINGS.map((setting) => (
          <div key={setting} className="vertical-parameters-settings__item">
            <div
              id={`bar-${setting}`}
              className="vertical-parameters-settings__bar-container"
              onMouseDown={(e) => handleMouseDown(e, setting)}
            >
              <div className="vertical-parameters-settings__bar-bg"></div>

              <div
                className="vertical-parameters-settings__bar-fill"
                style={{ height: `${preferences[setting]}%` }}
              ></div>

              <input
                type="range"
                min="0"
                max="100"
                value={preferences[setting] || 50}
                className="vertical-parameters-settings__input"
                readOnly
              />
            </div>

            <div className="vertical-parameters-settings__description">
                <label className="vertical-parameters-settings__label">
                    <span className={`icon ${SETTINGS_ICONS[setting]}`}></span>
                    <span className="vertical-parameters-settings__percentage">{preferences[setting]}%</span>
                </label>
                <span className="vertical-parameters-settings__setting-name">{t(`settings.${setting}`)}</span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="vertical-parameters-settings__title">
        {t("mood-form.settings")}
        <Tooltip
          text={t("mood-form.preferences-info")}
          link={{ href: "/preferences-info", text: t("mood-form.preferences-learn") }}
        >
          <span className="icon icon-question" />
        </Tooltip>
      </h2>
    </div>
  );
};

export default VerticalParametersSettings;
