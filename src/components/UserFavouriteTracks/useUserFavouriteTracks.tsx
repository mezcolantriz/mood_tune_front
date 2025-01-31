import { useState, useEffect } from "react";
import { FavouriteTracks } from "../../types/userSpotifyData";
import { getUserFavouriteTracks } from "../../utils/getUserSpotifyData";

export const useUserFavouriteTracks = () => {
    const [favouriteTracks, setFavouriteTracks] = useState<FavouriteTracks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const favouriteTracksData = await getUserFavouriteTracks();
                setFavouriteTracks(favouriteTracksData ?? []);
            } catch (error) {
                setError(`Hubo un problema obteniendo tus canciones guardadas. Intenta nuevamente más tarde: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { favouriteTracks, loading, error, setError };
};
