import React from "react"
import { useUserPlaylists } from "./useUserPlaylists";
import { Playlist } from "../../types/userSpotifyData";

const UserPlaylists: React.FC = () => {
    const {playlists, loading} = useUserPlaylists();
    if (loading) return <div>Cargando datos...</div>;

    return (
        <>
            <h2>🎶 Your Playlists</h2>
            <ul>
                {playlists.map((playlist: Playlist) => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </>
    )
}

export default UserPlaylists;