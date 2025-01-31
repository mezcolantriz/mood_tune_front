import { useState, useEffect } from "react";
import { Track } from "../../types/userSpotifyData";
import { getUserTopTracks } from "../../utils/getUserSpotifyData";

export const useUserTopTracks = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const topTracksData = await getUserTopTracks();
                setTopTracks(topTracksData?.items ?? []);
            } catch (error) {
                setError(`There was a problem getting the featured songs. Try again later: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { topTracks, loading, error, setError };
};
