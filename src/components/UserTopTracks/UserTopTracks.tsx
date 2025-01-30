import React from "react"
import { useUserTopTracks } from "./useUserTopTracks";
import { Track } from "../../types/userSpotifyData";

const UserTopTracks: React.FC = () => {
    const {topTracks, loading} = useUserTopTracks();
    if (loading) return <div>Cargando datos...</div>;

    return (
        <>
            <h2>🔥 Your Most Listened Songs</h2>
            <ul>
                {topTracks.map((track: Track) => (
                    <li key={track.id}>
                        {track.name} - {track.artists?.map((artist) => artist.name).join(", ") || "Unknown artist"}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserTopTracks;