import React from "react";
import { useUserData } from "./hooks/useUserData";
import { Playlist, Track, Artist, SavedTrack } from "./types";

const Profile: React.FC = () => {
    const { playlists, topTracks, topArtists, favoriteTracks, loading } = useUserData();

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
                {favoriteTracks.map((savedTrack: SavedTrack) => {
                    if (!savedTrack || !savedTrack.track) return null;

                    const { track } = savedTrack;
                    const album = track.album ?? null;
                    const albumName = album ? album.name : "No album available";
                    const albumImage = album?.images?.[0]?.url || "";
                    const artistNames = track.artists?.length
                        ? track.artists.map((artist) => artist.name).join(", ")
                        : "Unknown artist";
                    const savedDate = savedTrack.added_at
                        ? new Date(savedTrack.added_at).toLocaleDateString()
                        : "Unknown date";

                    return (
                        <li key={track.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            {albumImage ? (
                                <img
                                    src={albumImage}
                                    alt={track.name}
                                    style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                                />
                            ) : (
                                <span>🎵 No album image</span>
                            )}

                            <div>
                                <strong>{track.name}</strong> - {artistNames} <br />
                                <small>🎶 Album: {albumName}</small> <br />
                                <small>📅 Saved on: {savedDate}</small>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Profile;
