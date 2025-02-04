import { useState, FormEvent } from "react";
import Button from "../Button/Button";
import { Textarea } from "../Textarea/Textarea";
import GenreFilter from "./GenreFilter";
import Settings from "./Settings";

interface MoodTuneFormProps {
  onAnalyzeMood: (moodText: string, genres?: string[]) => void;
  onGetSurprisePlaylist: () => void;
}

const MoodForm = ({ onAnalyzeMood, onGetSurprisePlaylist }: MoodTuneFormProps) => {
  const [moodText, setMoodText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Todos"]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (moodText.trim() !== "") {
      const genresToSend = selectedGenres.includes("Todos") ? [] : selectedGenres;
      onAnalyzeMood(moodText, genresToSend);
    }
  };

  return (
    <div>
      <h2>What do you want to listen to today?</h2>
      <form onSubmit={handleSubmit}>
        <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
        <Settings />
        <div>
          <Textarea
            id="moodText"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            placeholder="Tell us how you feel"
          />
        </div>

        <Button type="submit" variant="primary" text="Get a playlist based on my mood" />
      </form>

      <span>or</span>
      <div>
        <Button type="button" variant="secondary" onClick={onGetSurprisePlaylist} text="Just give me something I like" />
      </div>
    </div>
  );
};

export default MoodForm;
