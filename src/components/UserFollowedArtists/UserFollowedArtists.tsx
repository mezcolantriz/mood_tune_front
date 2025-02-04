import React from "react";
import { useUserFollowedArtists } from "./useUserFollowedArtists";
import Error from "../Error/Error";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./UserFollowedArtists.scss";

const UserFollowedArtists: React.FC = () => {
    const { followedArtists, loading, error, setError } = useUserFollowedArtists();

    return (
        <div className="followed-artists">
            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <LoadingSpinner />
            ) : followedArtists.length === 0 ? (
                <p>It seems like you still don't follow any artists.</p>
            ) : (
                <ul className="followed-artists__list">
                    {followedArtists.map((artist) => (
                        <li key={artist.id} className="followed-artists__item">
                            <a 
                                href={artist.external_urls.spotify} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="followed-artists__link"
                            >
                                <img 
                                    src={artist.images?.[0]?.url || "/default-artist.png"} 
                                    alt={artist.name} 
                                    className="followed-artists__image"
                                />
                                <span className="followed-artists__name">{artist.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFollowedArtists;
