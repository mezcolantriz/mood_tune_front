import React from "react";
import { useUserData } from "./hooks/useUserData";
import { Playlist, Track, Artist } from "./types";

const Profile: React.FC = () => {
    const { playlists, topTracks, topArtists, loading } = useUserData();

    if (loading) return <div>Cargando datos...</div>;

    return (
        <div>
            <h1>Welcome to MoodTune 🎵</h1>

            <h2>🎶 Your Playlists</h2>
            <ul>
                {playlists.map((playlist: Playlist) => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>

            <h2>🔥 Your Most Listened Songs</h2>
            <ul>
                {topTracks.map((track: Track) => (
                    <li key={track.id}>
                        {track.name} - {track.artists?.map((artist) => artist.name).join(", ") || "Unknown artist"}
                    </li>
                ))}
            </ul>

            <h2>🎤 Your Favorite Artists</h2>
            <ul>
                {topArtists.map((artist: Artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>

            
        </div>
    );
};

export default Profile;
