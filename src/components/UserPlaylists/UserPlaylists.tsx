import React from "react";
import { useUserPlaylists } from "./useUserPlaylists";
import Error from "../Error/Error";
import { Playlist } from "../../types/userSpotifyData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./UserPlaylists.scss";

const UserPlaylists: React.FC = () => {
    const { playlists, loading, error, setError } = useUserPlaylists();

    return (
        <div className="user-playlists">
            {error && <Error message={error} onClose={() => setError(null)} />}

            {loading ? (
                <LoadingSpinner/>
            ) : playlists.length === 0 ? (
                <p>It seems like you don't have any playlists yet.</p>
            ) : (
                <ul className="user-playlists__list">
                    {playlists.map((playlist: Playlist) => (
                        <li key={playlist.id} className="user-playlists__item">
                            <a 
                                href={playlist.external_urls.spotify} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="user-playlists__playlist"
                            >
                                <img 
                                    src={playlist.images?.[0]?.url || "/default-playlist.png"} 
                                    alt={playlist.name} 
                                    className="user-playlists__image"
                                />

                                <div className="user-playlists__data">
                                    <h4 className="user-playlists__title">{playlist.name}</h4>
                                    <div className="user-playlists__info">
                                        <span className="user-playlists__description">{playlist.description}</span>
                                        <span className="user-playlists__songs-num">{playlist.tracks.total} songs</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserPlaylists;
