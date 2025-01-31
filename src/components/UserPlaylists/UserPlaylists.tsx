import React from "react";
import { useUserPlaylists } from "./useUserPlaylists";
import Error from "../Error/Error";
import { Playlist } from "../../types/userSpotifyData";

const UserPlaylists: React.FC = () => {
    const { playlists, loading, error, setError } = useUserPlaylists();

    return (
        <div className="user-playlists">
            <h2>🎶 Your Playlists</h2>

            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <div className="user-playlists__loading">🔄 Cargando...</div>
            ) : playlists.length === 0 ? (
                <p>No tienes playlists.</p>
            ) : (
                <ul className="user-playlists__list">
                    {playlists.map((playlist: Playlist) => (
                        <li key={playlist.id} className="user-playlists__item">
                            <img 
                                src={playlist.images?.[0]?.url || "/default-playlist.png"} 
                                alt={playlist.name} 
                                className="user-playlists__image"
                            />
                            <div className="user-playlists__info">
                                <a 
                                    href={playlist.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="user-playlists__name"
                                >
                                    {playlist.name}
                                </a>
                                <p className="user-playlists__details">
                                    🏷 {playlist.description || "Sin descripción"} | 🎵 {playlist.tracks.total} canciones
                                </p>
                                <a 
                                    href={playlist.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="user-playlists__link"
                                >
                                    🔗 Abrir en Spotify
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserPlaylists;
