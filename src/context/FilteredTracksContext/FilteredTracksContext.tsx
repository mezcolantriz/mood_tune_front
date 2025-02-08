import { createContext } from "react";
import { TrackResponse } from "../../types/userSpotifyData";

type FilteredTracksContextType = {
    topTracks: TrackResponse[];
    favouriteTracks: TrackResponse[];
    loading: boolean;
    error: string | null;
    requestsCompleted: boolean;
};

export const FilteredTracksContext = createContext<FilteredTracksContextType | undefined>(undefined);
