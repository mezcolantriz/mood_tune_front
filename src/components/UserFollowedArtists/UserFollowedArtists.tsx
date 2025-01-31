import React from "react"
import { useUserFollowedArtists } from "./useUserFollowedArtists";
import Error from "../Error/Error";

const UserFollowedArtists: React.FC = () => {
    const { followedArtists, loading, error, setError } = useUserFollowedArtists();

    return (
        <div className="followed-artists">
            <h2>Artistas Seguidos</h2>

            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <div className="followed-artists__loading">🔄 Cargando...</div>
            ) : followedArtists.length === 0 ? (
                <p>No sigues a ningún artista.</p>
            ) : (
                <ul className="followed-artists__list">
                    {followedArtists.map((artist) => (
                        <li key={artist.id} className="followed-artists__item">
                            <img src={artist.images?.[0]?.url || "/default-artist.png"} alt={artist.name} />
                            <span>{artist.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFollowedArtists;