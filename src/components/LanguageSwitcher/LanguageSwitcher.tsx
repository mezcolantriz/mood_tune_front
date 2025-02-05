import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.scss";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("moodtune_language", lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("en")}
        className={`language-switcher__btn ${currentLanguage === "en" ? "selected" : ""}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("es")}
        className={`language-switcher__btn ${currentLanguage === "es" ? "selected" : ""}`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
