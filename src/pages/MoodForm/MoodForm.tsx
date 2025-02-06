import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import { Textarea } from "../../components/Textarea/Textarea";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import ParametersSettings from "../../components/ParametersSettings/ParametersSettings";
import "./MoodForm.scss";

interface MoodTuneFormProps {
  onAnalyzeMood: (moodText: string, genres?: string[]) => void;
  onGetSurprisePlaylist: () => void;
}

const MoodForm = ({ onAnalyzeMood, onGetSurprisePlaylist }: MoodTuneFormProps) => {
  const { t } = useTranslation();
  const [moodText, setMoodText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["all genres"]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (moodText.trim() !== "") {
      const genresToSend = selectedGenres.includes("all genres") ? [] : selectedGenres;
      onAnalyzeMood(moodText, genresToSend);
    }
  };

  return (
    <div className="mood-form">
      <form className="mood-form__form-body" onSubmit={handleSubmit}>
        <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
        <div className="mood-form__form-main">
          <ParametersSettings />
          <div className="mood-form__form-form">
            <h4 className="mood-form__form-title">{t("mood-form.title")}</h4>
            <Textarea
              id="moodText"
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              placeholder={t("mood-form.textarea-placeholder")}
              className="mood-form__form-textarea"
            />

            <div className="mood-form__form-buttons">
              <Button type="submit" variant="primary" text={t("mood-form.get-playlist-mood")} />
              <span className="mood-form__form-divisor">{t("mood-form.or")}</span>
              <Button type="button" variant="secondary" onClick={onGetSurprisePlaylist} text={t("mood-form.get-something-like")} />
            </div>

            <p className="mood-form__form-info">
              <span className="icon icon-info"></span>
              {t("mood-form.form-info")}
            </p>
          </div>
        </div>
      </form>
      </div>
  );
};

export default MoodForm;
