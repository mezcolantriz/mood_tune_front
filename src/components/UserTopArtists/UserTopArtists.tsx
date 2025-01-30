import React from "react"
import { useUserTopArtists } from "./useUserTopArtists";
import { Artist } from "../../types/userSpotifyData";

const UserTopArtists: React.FC = () => {
    const {topArtists, loading} = useUserTopArtists();
    if (loading) return <div>Cargando datos...</div>;

    return (
        <>
            <h2>🎤 Your Favorite Artists</h2>
            <ul>
                {topArtists.map((artist: Artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </>
    )
}

export default UserTopArtists;