import React from "react";
import { useUserFavouriteTracks } from "./useUserFavouriteTracks";
import Error from "../Error/Error";

const UserFavouriteTracks: React.FC = () => {
    const { favouriteTracks, loading, error, setError } = useUserFavouriteTracks();

    return (
        <div className="favourite-tracks">
            <h2>💖 Your Saved Songs</h2>

            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <div className="favourite-tracks__loading">🔄 Cargando...</div>
            ) : favouriteTracks.length === 0 ? (
                <p>No tienes canciones guardadas.</p>
            ) : (
                <ul className="favourite-tracks__list">
                    {favouriteTracks.map(({ added_at, track }) => (
                        <li key={track.id} className="favourite-tracks__item">
                            <img
                                src={track.album.images[0]?.url || "/default-album.png"}
                                alt={track.name}
                                className="favourite-tracks__image"
                            />
                            <div className="favourite-tracks__info">
                                <a 
                                    href={track.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="favourite-tracks__name"
                                >
                                    {track.name}
                                </a>
                                <p className="favourite-tracks__artists">
                                    {track.artists.map((artist) => artist.name).join(", ") || "Unknown artist"}
                                </p>
                                <p className="favourite-tracks__details">
                                    📀 {track.album.name} | ⏱ {(track.duration_ms / 60000).toFixed(2)} min | ⭐ {track.popularity}
                                </p>
                                <p className="favourite-tracks__added">
                                    Guardada el: {new Date(added_at).toLocaleDateString()}
                                </p>
                                <a 
                                    href={track.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="favourite-tracks__link"
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

export default UserFavouriteTracks;
