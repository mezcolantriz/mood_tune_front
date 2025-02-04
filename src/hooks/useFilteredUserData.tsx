import { useState, useEffect } from "react";
import {
    getUserTopTracks,
    getFilteredTopTracks,
    getUserFollowedArtists,
    getFilteredFollowedArtists,
    getUserFavouriteTracks,
    getFilteredFavouriteTracks
} from "./getUserSpotifyData";
import { Track, Artist, FavouriteTracks } from "../types/userSpotifyData";

export const useUserData = () => {
    // 🔹 Ahora los estados tienen tipado correcto
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [followedArtists, setFollowedArtists] = useState<Artist[]>([]);
    const [favouriteTracks, setFavouriteTracks] = useState<FavouriteTracks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const topTracksData = await getUserTopTracks();
                const filteredTopTracks = await getFilteredTopTracks(topTracksData.items || []);
                setTopTracks(filteredTopTracks.filtered_tracks || []);

                const followedArtistsData = await getUserFollowedArtists();
                const filteredArtists = await getFilteredFollowedArtists(followedArtistsData.items || []);
                setFollowedArtists(filteredArtists.filtered_artists || []);

                const favouriteTracksData = await getUserFavouriteTracks();
                const filteredFavouriteTracks = await getFilteredFavouriteTracks({ tracks: favouriteTracksData });

                setFavouriteTracks(
                    filteredFavouriteTracks.filtered_tracks.map(track => ({
                        added_at: new Date().toISOString(),
                        track
                    }))
                );
            } catch (error) {
                setError(`There was a problem fetching user data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { topTracks, followedArtists, favouriteTracks, loading, error };
};
