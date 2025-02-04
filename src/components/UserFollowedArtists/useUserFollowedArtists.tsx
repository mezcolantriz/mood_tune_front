import { useState, useEffect } from "react";
import { Artist } from "../../types/userSpotifyData";
import { getUserFollowedArtists } from "../../hooks/getUserSpotifyData";
import { getFilteredFollowedArtists } from "../../hooks/getUserSpotifyData";

export const useUserFollowedArtists = () => {
    const [followedArtists, setFollowedArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const followedArtistsData = await getUserFollowedArtists();
                
                const filteredArtistsResponse = await getFilteredFollowedArtists(followedArtistsData.items);
                
                setFollowedArtists(filteredArtistsResponse.filtered_artists);
            } catch (error) {
                setError(`Hubo un problema obteniendo los artistas seguidos: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { followedArtists, loading, error, setError };
};
