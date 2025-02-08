import { useEffect, useState } from "react";
import "./Moods.scss";
import { RecommendedSong } from "../../types/userSpotifyData";

const Moods = () => {
  const [playlist, setPlaylist] = useState<RecommendedSong[]>([]);
  const [showTranslation, setShowTranslation] = useState<{ [key: string]: boolean }>({});
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [moodText, setMoodText] = useState<string>(""); // Para asegurar el nombre correcto

  useEffect(() => {
    const savedPlaylist = localStorage.getItem("moodPlaylist");
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist) as RecommendedSong[]);
    }

    // Asegurar que el nombre del mood sea el correcto al crear la playlist
    const savedMoodText = localStorage.getItem("moodText") || "My Mood List";
    setMoodText(savedMoodText);
  }, []);

  const toggleTranslation = (songId: string) => {
    setShowTranslation((prev) => ({ ...prev, [songId]: !prev[songId] }));
  };

  const createSpotifyPlaylist = async () => {
    setCreatingPlaylist(true);
    setErrorMessage("");

    try {
      const userMood = `My Mood List: ${moodText}`; // Asegura que use el nombre correcto
      const trackUris = playlist.map(song => `spotify:track:${getSpotifyId(song.spotify_url)}`);
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        alert("No estás autenticado con Spotify. Por favor, inicia sesión.");
        return;
      }

      console.log("🎵 Creando playlist en Spotify...");

      // 1️⃣ Obtener el User ID del usuario
      const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.error("❌ Error al obtener el User ID de Spotify", errorData);
        setErrorMessage(`Error: ${errorData.error.message}`);
        return;
      }

      const userData = await userResponse.json();
      const userId = userData.id;

      // 2️⃣ Crear la playlist en Spotify
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userMood,
          description: "Playlist generada por MoodTune",
          public: false,
        }),
      });

      if (!createPlaylistResponse.ok) {
        const errorData = await createPlaylistResponse.json();
        console.error("❌ Error al crear la playlist en Spotify", errorData);
        setErrorMessage(`Error: ${errorData.error.message}`);
        return;
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      console.log(`✅ Playlist creada con éxito: ${playlistData.name} (ID: ${playlistId})`);

      // 3️⃣ Agregar las canciones a la playlist creada
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUris }),
      });

      if (!addTracksResponse.ok) {
        const errorData = await addTracksResponse.json();
        console.error("❌ Error al añadir canciones a la playlist", errorData);
        setErrorMessage(`Error al añadir canciones: ${errorData.error.message}`);
        return;
      }

      console.log("🎶 Canciones añadidas con éxito.");

      // 4️⃣ Redirigir automáticamente a la playlist creada en Spotify
      window.open(playlistData.external_urls.spotify, "_blank");

    } catch (error) {
      console.error("❌ Error inesperado:", error);
      setErrorMessage("Error inesperado. Revisa la consola.");
    } finally {
      setCreatingPlaylist(false);
    }
  };

  return (
    <div className="moods-container">
      <h2 className="moods-title">🎶 Tu Playlist Recomendada 🎶</h2>

      {errorMessage && <p className="error-message">❌ {errorMessage}</p>}

      <button className="create-playlist-button" onClick={createSpotifyPlaylist} disabled={creatingPlaylist}>
        {creatingPlaylist ? "Creando Playlist..." : "🟢 Crea tu Mood List en Spotify"}
      </button>

      {playlist.length > 0 ? (
        <ul className="moods-list">
          {playlist.map((song, index) => (
            <li key={index} className="mood-song">
              <div className="song-header">
                <h3 className="song-title">{song.song_name}</h3>
                <p className="artist-name">{song.artist_name}</p>
              </div>

              {/* 🔹 Mostrar solo UNA versión de la letra */}
              <p className="lyrics">
                {showTranslation[song.id]
                  ? `${song.translated_lyrics.slice(0, 499)}...` // Añadir "..." para indicar que sigue
                  : `${song.processed_lyrics.slice(0, 499)}...`}
              </p>

              {/* 🔹 Botón para alternar traducción */}
              <button className="translate-button" onClick={() => toggleTranslation(song.id)}>
                {showTranslation[song.id] ? "Ver en Inglés" : "Traducir Letra"}
              </button>

              {/* 🔹 Mejor diseño del reproductor de Spotify */}
              <div className="spotify-player-container">
                <iframe
                  src={`https://open.spotify.com/embed/track/${getSpotifyId(song.spotify_url)}`}
                  width="80%"  // Reducir el ancho
                  height="80"
                  frameBorder="0"
                  allowTransparency={true}
                  allow="encrypted-media"
                  className="spotify-player"
                ></iframe>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-songs">No hay canciones recomendadas aún.</p>
      )}
    </div>
  );
};

// 🔹 Extraer ID de la canción de la URL de Spotify
const getSpotifyId = (url: string): string => {
  const match = url.match(/track\/(\w+)/);
  return match ? match[1] : "";
};

export default Moods;
