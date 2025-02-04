import React from "react";
import { useUserFavouriteTracks } from "./useUserFavouriteTracks";
import Error from "../Error/Error";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./UserFavouriteTracks.scss";

const UserFavouriteTracks: React.FC = () => {
    const { favouriteTracks, loading, error, setError } = useUserFavouriteTracks();

    return (
        <div className="favourite-tracks">
            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <LoadingSpinner />
            ) : favouriteTracks.length === 0 ? (
                <p>It looks like you don't have any songs saved yet.</p>
            ) : (
                <ul className="favourite-tracks__list">
                    {favouriteTracks.map(({ track }) => (
                        <li key={track.id} className="favourite-tracks__item">
                            <div className="favourite-tracks__image">
                                <img
                                    src={track.album.images[0]?.url || "/default-album.png"}
                                    alt={track.name}
                                    className="favourite-tracks__image-image"
                                />
                            </div>
                            
                            <div className="favourite-tracks__info">
                                <h4 className="favourite-tracks__name">{track.name}</h4>
                                
                                <div className="favourite-tracks__data">
                                    <span className="favourite-tracks__artists">
                                        {track.artists.map((artist) => artist.name).join(", ") || "Unknown artist"}
                                    </span>
                                    <span> | </span>
                                    <span>{track.album.name}</span>
                                </div>
                                
                                <div className="favourite-tracks__details">
                                    ⏱ {(track.duration_ms / 60000).toFixed(2)} min | ⭐ {track.popularity}
                                </div>
                            </div>

                            <a 
                                href={track.external_urls.spotify} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="favourite-tracks__link"
                            >
                                <span className="icon icon-play-otlined"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFavouriteTracks;
