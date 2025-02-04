import "./GenreFilter.scss";

type GenreFilterProps = {
    selectedGenres: string[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  };
  
  const genreGroups: Record<string, string[]> = {
    "All genres": [],
    "Rock": ["rock", "hard", "heavy", "alternative", "progressive", "classic", "indie", "postrock", "garage", "grunge", "stoner"],
    "Pop": ["pop", "synthpop", "electropop", "dancepop", "indiepop", "powerpop", "britpop"],
    "Indie": ["indie", "indiepop", "indietronica", "folkrock", "lofi", "shoegaze"],
    "Metal": ["metal", "metalcore", "death", "black", "thrash", "doom", "grindcore", "numetal", "symphonic", "sludge", "gothic"],
    "Hip-Hop / Rap": ["hiphop", "rap", "trap", "gangsta", "crunk", "grime", "freestyle"],
    "Electronic": ["electronic", "electro", "house", "techno", "trance", "dubstep", "synthwave", "dnb", "industrial", "idm"],
    "Alternative": ["alternative", "experimental", "psychedelic", "postpunk", "newwave", "darkwave"],
    "Punk": ["punk", "hardcore", "posthardcore", "screamo", "emo"],
    "Jazz": ["jazz", "blues", "swing", "fusion", "bigband", "bebop"],
    "R&B / Soul": ["rnb", "soul", "neosoul", "funk", "motown", "gospel"],
    "Latin": ["latin", "reggaeton", "salsa", "bachata", "tango", "mariachi"],
    "Reggae": ["reggae", "roots", "dancehall", "dub"],
    "Funk / Disco": ["funk", "disco", "boogie", "groove", "soulful", "rhythm"]
  };
  
  export default function GenreFilter({ selectedGenres, setSelectedGenres }: GenreFilterProps) {
    const handleCheckboxChange = (genre: string) => {
      if (genre === "All genres") {
        setSelectedGenres(["All genres"]);
      } else {
        let updatedSelection;
        if (selectedGenres.includes(genre)) {
          updatedSelection = selectedGenres.filter((g) => g !== genre);
        } else {
          updatedSelection = [...selectedGenres.filter((g) => g !== "All genres"), genre];
        }
        setSelectedGenres(updatedSelection.length > 0 ? updatedSelection : ["All genres"]);
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
              {genre}
            </label>
          ))}
        </div>
      </div>
    );
}
  