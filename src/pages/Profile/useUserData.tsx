import { useState, useEffect } from "react";
import { getUserPlaylists, getTopTracks, getTopArtists, getFavoriteTracks } from "../../utils/apiUserData";
import { UserData, Playlist, Track, Artist } from "./types";

export function useUserData(): UserData {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [favoriteTracks, setFavoriteTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [playlistsData, topTracksData, topArtistsData, favoriteTracksData] = await Promise.all([
                    getUserPlaylists(),
                    getTopTracks(),
                    getTopArtists(),
                    getFavoriteTracks()
                ]);

                setPlaylists(playlistsData.items || []);
                setTopTracks(topTracksData.items || []);
                setTopArtists(topArtistsData.items || []);
                setFavoriteTracks(favoriteTracksData.items || []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { playlists, topTracks, topArtists, favoriteTracks, loading };
}
