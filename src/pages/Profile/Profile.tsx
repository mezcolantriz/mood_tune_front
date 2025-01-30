import React from "react";
import { useUserData } from "./hooks/useUserData";
import { Playlist, Track, Artist } from "./types";

const Profile: React.FC = () => {
    const { playlists, topTracks, topArtists, favouriteTracks, loading } = useUserData();

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

            <h2>💖 Your Saved Songs</h2>
            <ul>
              {favouriteTracks.map(({ added_at, track }) => (
                <li key={track.id}>
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                  />
                  <strong>{track.name}</strong> - {track.artists.map((artist) => artist.name).join(", ")} (
                  {track.album.name})<br />
                  Guardada el: {new Date(added_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
        </div>
    );
};

export default Profile;
