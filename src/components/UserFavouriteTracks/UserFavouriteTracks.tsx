import React from "react";
import Error from "../Error/Error";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { TrackResponse } from "../../types/userSpotifyData";
import "./UserFavouriteTracks.scss";

interface UserFavouriteTracksProps {
    favouriteTracks: TrackResponse[];
    loading: boolean;
    error: string | null;
    setError?: (error: string | null) => void;
}

const UserFavouriteTracks: React.FC<UserFavouriteTracksProps> = ({ favouriteTracks, loading, error, setError }) => {
    return (
        <div className="favourite-tracks">
            {error && setError && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <LoadingSpinner />
            ) : favouriteTracks.length === 0 ? (
                <p>It looks like you don't have any favourite songs saved yet.</p>
            ) : (
                <ul className="favourite-tracks__list">
                    {favouriteTracks.map((trackData) => {
                        const track = trackData.spotify_data;

                        return track ? (
                            <li key={track.spotify_url || `track-${Math.random()}`} className="favourite-tracks__item">
                                <div className="favourite-tracks__image">
                                    <img
                                        src={trackData.spotify_data?.picture}
                                        alt={track.original_name || "Unknown track"}
                                        className="favourite-tracks__image-image"
                                    />
                                </div>
                                
                                <div className="favourite-tracks__info">
                                    <h4 className="favourite-tracks__name">{track.original_name || "Unknown Track"}</h4>
                                    
                                    <div className="favourite-tracks__data">
                                        <span className="favourite-tracks__artists">{track.artist || "Unknown artist"}</span>
                                        <span> | </span>
                                        <span>{track.album || "Unknown album"}</span>
                                    </div>
                                    
                                    <div className="favourite-tracks__details">
                                        ⏱ {(track.duration_ms ? track.duration_ms / 60000 : 0).toFixed(2)} min | ⭐ {track.popularity ?? "N/A"}
                                    </div>
                                </div>

                                {track.spotify_url && (
                                    <a 
                                        href={track.spotify_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="favourite-tracks__link"
                                    >
                                        <span className="icon icon-play-outlined"></span>
                                    </a>
                                )}
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </div>
    );
};

export default UserFavouriteTracks;
