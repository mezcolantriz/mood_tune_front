import React from "react";
import { useUserPlaylists } from "./useUserPlaylists";
import { Playlist, Track } from "../../types/userSpotifyData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Error from "../Error/Error";
import "./UserPlaylists.scss";

const UserPlaylists: React.FC = () => {
    const { playlists, moodTuneTracks, expandedPlaylist, togglePlaylist, loading, error, setError } = useUserPlaylists();

    return (
        <div className="user-playlists">
            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <LoadingSpinner />
            ) : playlists.length === 0 ? (
                <p>It seems like you don't have any playlists yet.</p>
            ) : (
                <ul className="user-playlists__list">
                    {playlists.map((playlist: Playlist) => {
                        const isExpanded = expandedPlaylist === playlist.id;
                        const tracks = moodTuneTracks[playlist.id] || [];
                        const previewTracks = tracks.slice(0, 3);

                        return (
                            <li key={playlist.id} className={`user-playlists__item ${isExpanded ? "expanded" : ""}`}>
                                <div className="user-playlists__playlist">
                                    <img 
                                        src={playlist.images?.[0]?.url || "/default-playlist.png"} 
                                        alt={`Cover of ${playlist.name}`} 
                                        className="user-playlists__image"
                                    />
                                    <div className="user-playlists__details">
                                        <h4 className="user-playlists__title">{playlist.name}</h4>
                                        <ul className="user-playlists__tracklist">
                                            {(isExpanded ? tracks : previewTracks).map((track: Track) => (
                                                <li key={track.id} className="user-playlists__track">
                                                    {isExpanded && (
                                                        <div className="spotify-player-container">
                                                            <iframe
                                                                src={`https://open.spotify.com/embed/track/${track.external_urls?.spotify?.split("/track/")[1]?.split("?")[0]}`}
                                                                width="100%"
                                                                height="80"
                                                                frameBorder="0"
                                                                sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                                                                allow="encrypted-media"
                                                                className="spotify-player"
                                                            ></iframe>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="user-playlists__toggle-btn" onClick={() => togglePlaylist(playlist.id)}>
                                            {isExpanded ? "Ver menos" : "Ver más >"}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default UserPlaylists;
