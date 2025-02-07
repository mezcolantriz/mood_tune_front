import React, { useState, useEffect, useRef } from "react";
import { FilteredTracksContext } from "./FilteredTracksContext";
import { useLoading } from "../LoadingContext/useLoading";

import {
    getFilteredTopTracks,
    getFilteredFavouriteTracks,
    getUserTopTracks,
    getUserFavouriteTracks,
} from "../../hooks/getUserSpotifyData";
import { FavouriteTracksData, TrackResponse } from "../../types/userSpotifyData";

export const FilteredTracksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { setIsLoading } = useLoading();
    const [topTracks, setTopTracks] = useState<TrackResponse[]>([]);
    const [favouriteTracks, setFavouriteTracks] = useState<TrackResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [requestsCompleted, setRequestsCompleted] = useState(false);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchFilteredTracks = async () => {
            try {
                setIsLoading(true);
                setRequestsCompleted(false);

                const [userTopTracks, userFavouriteTracks] = await Promise.all([
                    getUserTopTracks(),
                    getUserFavouriteTracks()
                ]);

                const favouriteTracksData: FavouriteTracksData = { tracks: userFavouriteTracks };

                const [topTracksData, favouriteTracksDataFiltered] = await Promise.all([
                    getFilteredTopTracks(userTopTracks.items),
                    getFilteredFavouriteTracks(favouriteTracksData)
                ]);

                setTopTracks(topTracksData.filtered_tracks ?? []);
                setFavouriteTracks(favouriteTracksDataFiltered.filtered_tracks ?? []);

            } catch (err) {
                setError(`Error fetching filtered tracks: ${err}`);
            } finally {
                setIsLoading(false);
                setRequestsCompleted(true);
            }
        };

        fetchFilteredTracks();
    });

    return (
        <FilteredTracksContext.Provider value={{ topTracks, favouriteTracks, loading: false, error, requestsCompleted }}>
            {children}
        </FilteredTracksContext.Provider>
    );
};
