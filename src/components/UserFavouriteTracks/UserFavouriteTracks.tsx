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
                        const dataset = trackData.dataset_data;

                        return track && dataset ? (
                            <li key={track.spotify_url || `track-${Math.random()}`} className="favourite-tracks__item">
                                <div className="favourite-tracks__image">
                                    <img
                                        src={track.picture}
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

                                    <div className="favourite-tracks__stats">
                                        <div className="stat">
                                            <span>Danceable</span>
                                            <progress value={dataset.danceable} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Male</span>
                                            <progress value={dataset.male} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Aggressive</span>
                                            <progress value={dataset.mood_aggressive} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Electronic</span>
                                            <progress value={dataset.mood_electronic} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Happy</span>
                                            <progress value={dataset.mood_happy} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Party</span>
                                            <progress value={dataset.mood_party} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Relaxed</span>
                                            <progress value={dataset.mood_relaxed} max="1"></progress>
                                        </div>
                                        <div className="stat">
                                            <span>Sad</span>
                                            <progress value={dataset.mood_sad} max="1"></progress>
                                        </div>
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
