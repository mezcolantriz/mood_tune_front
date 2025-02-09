import { useTranslation } from "react-i18next";
import { genreGroups } from "../../config";
import "./GenreFilter.scss";

type GenreFilterProps = {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GenreFilter({ selectedGenres, setSelectedGenres }: GenreFilterProps) {
  const { t } = useTranslation();

  const handleCheckboxChange = (genre: string) => {
    if (genre === "all genres") {
      setSelectedGenres(["all genres"]);
    } else {
      let updatedSelection;
      if (selectedGenres.includes(genre)) {
        updatedSelection = selectedGenres.filter((g) => g !== genre);
      } else {
        updatedSelection = [...selectedGenres.filter((g) => g !== "all genres"), genre];
      }
      setSelectedGenres(updatedSelection.length > 0 ? updatedSelection : ["all genres"]);
    }
  };

  return (
    <div className="genre-filters">
      <div className="genre-filters__item">
        {Object.keys(genreGroups).map((genre) => (
          <label
            key={genre}
            className={`genre-filters__genre ${
              selectedGenres.includes(genre) ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleCheckboxChange(genre)}
              className="hidden"
            />
            {t(`genres.${genre}`)}
          </label>
        ))}
      </div>
    </div>
  );
}
