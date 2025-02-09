import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import { Textarea } from "../../components/Textarea/Textarea";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import ParametersSettings from "../../components/ParametersSettings/ParametersSettings";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import VerticalParametersSettings from "../../components/VerticalParametersSettings/VerticalParametersSettings";
import "./MoodForm.scss";

const MoodForm = () => {
  const { t } = useTranslation();
  const [moodText, setMoodText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["all genres"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 🔹 Para redirigir a /moods

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (moodText.trim() === "") return;

    setLoading(true);
    try {
        // 🔹 Asegurar que si el usuario selecciona "all genres", enviamos un array vacío []
        const genresToSend = selectedGenres.includes("all genres") ? [] : selectedGenres;

        // 📌 Enviar la solicitud al backend con los géneros seleccionados
        const response = await fetch(`${API_URL}/songs/mood`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ moodText, genres: genresToSend }), 
        });

        if (!response.ok) throw new Error("Error al obtener la playlist");

        const recommendedSongs = await response.json();
        localStorage.setItem("moodPlaylist", JSON.stringify(recommendedSongs));
        localStorage.setItem("moodText", moodText);

        navigate("/moods");

    } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
    } finally {
        setLoading(false);
    }
};

  
  return (
    <div className="mood-form">
      <form className="mood-form__form-body" onSubmit={handleSubmit}>
        
        {/* 📌 Componente de filtro de género */}
        <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />

        <div className="mood-form__form-main">
          <ParametersSettings />
          <div className="mood-form__form-form">
            <h4 className="mood-form__form-title">{t("mood-form.title")}</h4>

            {/* 📌 Entrada de texto para el mood */}
            <Textarea
              id="moodText"
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              placeholder={t("mood-form.textarea-placeholder")}
              className="mood-form__form-textarea"
            />

            {/* 📌 Botones para generar playlist */}
            <div className="mood-form__form-buttons">
              <Button type="submit" variant="primary" text={loading ? "Cargando..." : t("mood-form.get-playlist-mood")} />
              <span className="mood-form__form-divisor">{t("mood-form.or")}</span>
              <Button type="button" variant="secondary" text={t("mood-form.get-something-like")} />
            </div>

            <div className="mood-form__block-bottom">
              <VerticalParametersSettings />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MoodForm;
