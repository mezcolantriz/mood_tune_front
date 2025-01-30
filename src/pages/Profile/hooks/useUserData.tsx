import { useState, useEffect } from "react";
import { getUserPlaylists, getUserTopArtists, getUserTopTracks, getUserFavouriteTracks } from "./getUserSpotifyData";
import { Playlist, Track, Artist, SavedTrack } from "../types";

export function useUserData() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [favouriteTracks, setFavouriteTracks] = useState<SavedTrack[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [playlistsData, topTracksData, topArtistsData, favouriteTracksData] = await Promise.all([
                    getUserPlaylists(),
                    getUserTopTracks(),
                    getUserTopArtists(),
                    getUserFavouriteTracks()
                ]);

                setPlaylists(playlistsData.items || []);
                setTopTracks(topTracksData.items || []);
                setTopArtists(topArtistsData.items || []);
                setFavouriteTracks(favouriteTracksData || []);
            } catch (error) {
                console.error("❌ Error obteniendo datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { playlists, topTracks, topArtists, favouriteTracks, loading };
}
