import React from "react";
import { useUserTopTracks } from "./useUserTopTracks";
import Error from "../Error/Error";
import { Track } from "../../types/userSpotifyData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./UserTopTracks.scss";

const UserTopTracks: React.FC = () => {
    const { topTracks, loading, error, setError } = useUserTopTracks();

    return (
        <div className="top-tracks">
            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <LoadingSpinner />
            ) : !Array.isArray(topTracks) || topTracks.length === 0 ? (
                <p>No tienes canciones destacadas.</p>
            ) : (
                <ul className="top-tracks__list">
                    {topTracks.map((track: Track) => (
                        track ? (
                            <li key={track.id || `track-${Math.random()}`} className="top-tracks__item">
                                <div className="top-tracks__image">
                                    <img 
                                        src={track.album?.images?.[0]?.url || "/default-album.png"} 
                                        alt={track.name || "Unknown track"} 
                                        className="top-tracks__image-image"
                                    />
                                </div>
                                
                                <div className="top-tracks__info">
                                    <h4 className="top-tracks__name">
                                        {track.name || "Unknown Track"}
                                    </h4>

                                    <div className="top-tracks__data">
                                        <span className="top-tracks__artists">
                                            {Array.isArray(track.artists) && track.artists.length > 0
                                                ? track.artists.map((artist) => artist.name).join(", ")
                                                : "Unknown artist"}
                                        </span>
                                        <span> | </span>
                                        <span>{track.album?.name || "Unknown album"}</span>
                                    </div>

                                    <div className="top-tracks__details">
                                        ⏱ {(track.duration_ms ? track.duration_ms / 60000 : 0).toFixed(2)} min | ⭐ {track.popularity ?? "N/A"}
                                    </div>
                                </div>

                                {track.external_urls?.spotify && (
                                    <a 
                                        href={track.external_urls.spotify} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="top-tracks__link"
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

export default UserTopTracks;
