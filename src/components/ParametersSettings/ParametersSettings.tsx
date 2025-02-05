import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltip/Tooltip";
import "./ParametersSettings.scss";

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

const ParametersSettings = () => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<{ [key: string]: number }>({});

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

  const handleChange = (setting: string, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <div className="parameters-settings">
      <h2 className="parameters-settings__title">
        {t("mood-form.preferences")}
        <Tooltip
          text={t("mood-form.preferences-info")}
          link={{ href: "/preferences-info", text: t("mood-form.preferences-learn") }}
        >
          <span className="icon icon-question" />
        </Tooltip>
      </h2>
      <div className="parameters-settings__settings">
        {SETTINGS.map((setting) => (
          <div key={setting} className="parameters-settings__item">
            <input
              type="range"
              min="0"
              max="100"
              value={preferences[setting] || 50}
              onChange={(e) => handleChange(setting, Number(e.target.value))}
              style={{
                background: `linear-gradient(90deg, 
                  rgba(130,43,190,1) 0%, 
                  rgba(251,111,172,1) ${preferences[setting] * 0.39}%, 
                  rgba(227,158,61,1) ${preferences[setting] * 0.67}%, 
                  rgba(253,229,81,1) ${preferences[setting] * 0.83}%, 
                  rgba(205,245,103,1) 100%)`,
              }}
              className="parameters-settings__input"
            />
            <label className="parameters-settings__label">
              {t(`settings.${setting}`)} {preferences[setting]}%
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParametersSettings;
