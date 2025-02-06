import React, { useState, useEffect } from "react";
import { FilteredTracksContext } from "./FilteredTracksContext";

import {
    getFilteredTopTracks,
    getFilteredFavouriteTracks,
    getUserTopTracks,
    getUserFavouriteTracks,
} from "../../hooks/getUserSpotifyData";
import { FavouriteTracksData, TrackResponse } from "../../types/userSpotifyData";

interface FilteredTracksResponse {
    filtered_tracks: TrackResponse[];
}

export const FilteredTracksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [topTracks, setTopTracks] = useState<TrackResponse[]>([]);
    const [favouriteTracks, setFavouriteTracks] = useState<TrackResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilteredTracks = async () => {
            try {
                setLoading(true);
        
                const userTopTracks = await getUserTopTracks();
    
                const userFavouriteTracks = await getUserFavouriteTracks();
    
                if (!userTopTracks.items || userTopTracks.items.length === 0) {
                    console.warn("No hay canciones en getUserTopTracks().");
                }
    
                if (!userFavouriteTracks || userFavouriteTracks.length === 0) {
                    console.warn("No hay canciones en getUserFavouriteTracks().");
                }
    
                const favouriteTracksData: FavouriteTracksData = { tracks: userFavouriteTracks };
                const topTracksData: FilteredTracksResponse = await getFilteredTopTracks(userTopTracks.items);
                const favouriteTracksDataFiltered: FilteredTracksResponse = await getFilteredFavouriteTracks(favouriteTracksData);

                setTopTracks(topTracksData.filtered_tracks ?? []);
                setFavouriteTracks(favouriteTracksDataFiltered.filtered_tracks ?? []);
            } catch (err) {
                setError(`Error fetching filtered tracks: ${err}`);
            } finally {
                setLoading(false);
            }
        };
    
        fetchFilteredTracks();
    }, []);

    return (
        <FilteredTracksContext.Provider value={{ topTracks, favouriteTracks, loading, error }}>
            {children}
        </FilteredTracksContext.Provider>
    );
};
