import React from "react";
import { useUserTopTracks } from "./useUserTopTracks";
import Error from "../Error/Error";
import { Track } from "../../types/userSpotifyData";

const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
};

const UserTopTracks: React.FC = () => {
    const { topTracks, loading, error, setError } = useUserTopTracks();

    return (
        <div className="top-tracks">
            <h2>🔥 Your Most Listened Songs</h2>

            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <div className="top-tracks__loading">🔄 Cargando...</div>
            ) : topTracks.length === 0 ? (
                <p>No tienes canciones destacadas.</p>
            ) : (
                <ul className="top-tracks__list">
                    {topTracks.map((track: Track) => (
                        <li key={track.id} className="top-track">
                            <img 
                                src={track.album?.images?.[0]?.url || "/default-album.png"} 
                                alt={track.name} 
                                className="top-track__image"
                            />
                            <div className="top-track__info">
                                <a 
                                    href={track.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="top-track__name"
                                >
                                    {track.name}
                                </a>
                                <p className="top-track__artists">
                                    {track.artists?.map((artist) => artist.name).join(", ") || "Unknown artist"}
                                </p>
                                <p className="top-track__details">
                                    ⏱ {formatDuration(track.duration_ms)} | ⭐ {track.popularity}
                                </p>
                                {track.preview_url && (
                                    <audio controls className="top-track__preview">
                                        <source src={track.preview_url} type="audio/mpeg" />
                                        Tu navegador no soporta la reproducción de audio.
                                    </audio>
                                )}
                                <a 
                                    href={track.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="top-track__link"
                                >
                                    🔗 Escuchar en Spotify
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserTopTracks;
