import { useState, useEffect } from "react";
import { FavouriteTracks } from "../../types/userSpotifyData";
import { getUserFavouriteTracks } from "../../hooks/getUserSpotifyData";
import { getFilteredFavouriteTracks } from "../../hooks/getUserSpotifyData";

export const useUserFavouriteTracks = () => {
    const [favouriteTracks, setFavouriteTracks] = useState<FavouriteTracks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const favouriteTracksData: FavouriteTracks[] = await getUserFavouriteTracks();
    
                if (!favouriteTracksData || favouriteTracksData.length === 0) {
                    setFavouriteTracks([]);
                    setLoading(false);
                    return;
                }
    
                const filteredTracksResponse = await getFilteredFavouriteTracks({ tracks: favouriteTracksData });
    
                const formattedTracks: FavouriteTracks[] = filteredTracksResponse.filtered_tracks.map(track => ({
                    added_at: new Date().toISOString(),
                    track
                }));
    
                setFavouriteTracks(formattedTracks);
            } catch (error) {
                setError(`Hubo un problema obteniendo tus canciones favoritas: ${error}`);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, []);
    

    return { favouriteTracks, loading, error, setError };
};
