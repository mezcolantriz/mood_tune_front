import { useState, useEffect } from "react";
import { Artist } from "../../types/userSpotifyData";
import { getUserFollowedArtists } from "../../utils/getUserSpotifyData";

export const useUserFollowedArtists = () => {
    const [followedArtists, setFollowedArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Manejo de errores

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const followedArtistsData = await getUserFollowedArtists();
                setFollowedArtists(followedArtistsData.items || []);
            } catch (error) {
                setError(`There was a problem getting artist followers. Try again later: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { followedArtists, loading, error, setError };
};
