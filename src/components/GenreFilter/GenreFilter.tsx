import { useTranslation } from "react-i18next";
import "./GenreFilter.scss";

type GenreFilterProps = {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
};

const genreGroups: Record<string, string[]> = {
  "all genres": [],
  "rock": ["rock", "hard", "heavy", "alternative", "progressive", "classic", "indie", "postrock", "garage", "grunge", "stoner"],
  "pop": ["pop", "synthpop", "electropop", "dancepop", "indiepop", "powerpop", "britpop"],
  "indie": ["indie", "indiepop", "indietronica", "folkrock", "lofi", "shoegaze"],
  "metal": ["metal", "metalcore", "death", "black", "thrash", "doom", "grindcore", "numetal", "symphonic", "sludge", "gothic"],
  "hip-hop / rap": ["hiphop", "rap", "trap", "gangsta", "crunk", "grime", "freestyle"],
  "electronic": ["electronic", "electro", "house", "techno", "trance", "dubstep", "synthwave", "dnb", "industrial", "idm"],
  "alternative": ["alternative", "experimental", "psychedelic", "postpunk", "newwave", "darkwave"],
  "punk": ["punk", "hardcore", "posthardcore", "screamo", "emo"],
  "jazz": ["jazz", "blues", "swing", "fusion", "bigband", "bebop"],
  "r&b / soul": ["rnb", "soul", "neosoul", "funk", "motown", "gospel"],
  "latin": ["latin", "reggaeton", "salsa", "bachata", "tango", "mariachi"],
  "reggae": ["reggae", "roots", "dancehall", "dub"],
  "funk / disco": ["funk", "disco", "boogie", "groove", "soulful", "rhythm"]
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
