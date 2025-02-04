import { useState, useEffect } from "react";
import { Track } from "../../types/userSpotifyData";
import { getUserTopTracks } from "../../hooks/getUserSpotifyData";
import { getFilteredTopTracks } from "../../hooks/getUserSpotifyData";

export const useUserTopTracks = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const topTracksData = await getUserTopTracks();
                
                const filteredTracksResponse = await getFilteredTopTracks(topTracksData.items);
                
                setTopTracks(filteredTracksResponse.filtered_tracks);
            } catch (error) {
                setError(`Hubo un problema obteniendo tus canciones más escuchadas: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { topTracks, loading, error, setError };
};
