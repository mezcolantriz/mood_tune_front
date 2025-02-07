import { useContext } from "react";
import { FilteredTracksContext } from "./FilteredTracksContext";
import { TrackResponse } from "../../types/userSpotifyData";

interface FilteredTracksContextType {
    topTracks: TrackResponse[];
    favouriteTracks: TrackResponse[];
    loading: boolean;
    error: string | null;
    requestsCompleted: boolean;
}

export const useFilteredTracks = (): FilteredTracksContextType => {
    const context = useContext(FilteredTracksContext);
    if (!context) {
        throw new Error("useFilteredTracks debe usarse dentro de un FilteredTracksProvider");
    }
    return context;
};
