import { useState, FormEvent } from "react";
import Button from "../Button/Button";
import { Textarea } from "../Textarea/Textarea";

interface MoodTuneFormProps {
    onAnalyzeMood: (moodText: string, genre?: string) => void;
    onGetSurprisePlaylist: () => void;
  }

const MoodForm = ({ onAnalyzeMood, onGetSurprisePlaylist }: MoodTuneFormProps) => {
  const [moodText, setMoodText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (moodText.trim() !== "") {
      onAnalyzeMood(moodText);
    }
  };

  return (
    <div>
      <h2>What do you want to listen today?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Textarea
            id="moodText"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            placeholder="Tell us how do you feel"
          />
        </div>

        <Button type="submit" variant="primary" text="Recomend me a playlist!"/>
      </form>
      <span>or</span>
      <div>
        <Button type="button" variant="secondary" onClick={onGetSurprisePlaylist} text="Give me something different" />
      </div>
    </div>
  );
};

export default MoodForm;
