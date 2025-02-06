import { useState, useEffect } from "react";
import { Track } from "../../types/userSpotifyData";
import { getUserTopTracks, getFilteredTopTracks } from "../../hooks/getUserSpotifyData";

export const useUserTopTracks = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const topTracksData = await getUserTopTracks();

                if (!topTracksData || !Array.isArray(topTracksData.items) || topTracksData.items.length === 0) {
                    setTopTracks([]);
                    return;
                }

                const filteredTracksResponse = await getFilteredTopTracks(topTracksData.items);

                if (!filteredTracksResponse || !Array.isArray(filteredTracksResponse.filtered_tracks)) {
                    setTopTracks([]);
                    return;
                }

                setTopTracks(filteredTracksResponse.filtered_tracks);
            } catch (error) {
                setError(`Problem getting songs: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { topTracks, loading, error, setError };
};
