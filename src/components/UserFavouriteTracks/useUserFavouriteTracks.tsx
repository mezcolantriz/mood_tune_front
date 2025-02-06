import { useState, useEffect } from "react";
import { FavouriteTracks } from "../../types/userSpotifyData";
import { getUserFavouriteTracks, getFilteredFavouriteTracks } from "../../hooks/getUserSpotifyData";

export const useUserFavouriteTracks = () => {
    const [favouriteTracks, setFavouriteTracks] = useState<FavouriteTracks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const favouriteTracksData: FavouriteTracks[] = await getUserFavouriteTracks();

                if (!favouriteTracksData || !Array.isArray(favouriteTracksData) || favouriteTracksData.length === 0) {
                    setFavouriteTracks([]);
                    return;
                }

                const filteredTracksResponse = await getFilteredFavouriteTracks({ tracks: favouriteTracksData });

                if (!filteredTracksResponse || !Array.isArray(filteredTracksResponse.filtered_tracks)) {
                    setFavouriteTracks([]);
                    return;
                }

                const formattedTracks: FavouriteTracks[] = filteredTracksResponse.filtered_tracks.map(track => ({
                    added_at: new Date().toISOString(),
                    track
                }));

                setFavouriteTracks(formattedTracks);
            } catch (error) {
                setError(`Problem loading tracks: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { favouriteTracks, loading, error, setError };
};
