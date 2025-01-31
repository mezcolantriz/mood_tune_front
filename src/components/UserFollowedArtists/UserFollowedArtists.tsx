import React from "react";
import { useUserFollowedArtists } from "./useUserFollowedArtists";
import Error from "../Error/Error";

const UserFollowedArtists: React.FC = () => {
    const { followedArtists, loading, error, setError } = useUserFollowedArtists();

    return (
        <div className="followed-artists">
            <h2>🎤 Artistas Seguidos</h2>

            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <div className="followed-artists__loading">🔄 Cargando...</div>
            ) : followedArtists.length === 0 ? (
                <p>No sigues a ningún artista.</p>
            ) : (
                <ul className="followed-artists__list">
                    {followedArtists.map((artist) => (
                        <li key={artist.id} className="followed-artists__item">
                            <img 
                                src={artist.images?.[0]?.url || "/default-artist.png"} 
                                alt={artist.name} 
                                className="followed-artists__image"
                            />
                            <div className="followed-artists__info">
                                <a 
                                    href={artist.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="followed-artists__name"
                                >
                                    {artist.name}
                                </a>
                                <a 
                                    href={artist.external_urls.spotify} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="followed-artists__link"
                                >
                                    🔗 Ver en Spotify
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFollowedArtists;
