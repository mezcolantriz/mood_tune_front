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
            ) : !Array.isArray(favouriteTracks) || favouriteTracks.length === 0 ? (
                <p>It looks like you don't have any songs saved yet.</p>
            ) : (
                <ul className="favourite-tracks__list">
                    {favouriteTracks.map(({ track }) => (
                        track ? (
                            <li key={track.id || `track-${Math.random()}`} className="favourite-tracks__item">
                                <div className="favourite-tracks__image">
                                    <img
                                        src={track.album?.images?.[0]?.url || "/default-album.png"}
                                        alt={track.name || "Unknown track"}
                                        className="favourite-tracks__image-image"
                                    />
                                </div>
                                
                                <div className="favourite-tracks__info">
                                    <h4 className="favourite-tracks__name">
                                        {track.name || "Unknown Track"}
                                    </h4>
                                    
                                    <div className="favourite-tracks__data">
                                        <span className="favourite-tracks__artists">
                                            {Array.isArray(track.artists) && track.artists.length > 0
                                                ? track.artists.map((artist) => artist.name).join(", ")
                                                : "Unknown artist"}
                                        </span>
                                        <span> | </span>
                                        <span>{track.album?.name || "Unknown album"}</span>
                                    </div>
                                    
                                    <div className="favourite-tracks__details">
                                        ⏱ {(track.duration_ms ? track.duration_ms / 60000 : 0).toFixed(2)} min | ⭐ {track.popularity ?? "N/A"}
                                    </div>
                                </div>

                                {track.external_urls?.spotify && (
                                    <a 
                                        href={track.external_urls.spotify} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="favourite-tracks__link"
                                    >
                                        <span className="icon icon-play-outlined"></span>
                                    </a>
                                )}
                            </li>
                        ) : null
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFavouriteTracks;
