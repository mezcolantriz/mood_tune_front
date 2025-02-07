import { useState, useEffect } from "react";

interface SpotifyData {
    original_name: string;
    artist: string;
    album: string;
    duration_ms: number;
    popularity: number;
}

interface DatasetData {
    recording_id: string;
    danceable: string;
    male: string;
    timbre_bright: string;
    tonal: string;
    instrumental: string;
    mood_acoustic: string;
    mood_aggressive: string;
    mood_electronic: string;
    mood_happy: string;
    mood_party: string;
    mood_relaxed: string;
    mood_sad: string;
    combined_genres: string;
}

interface FilteredTrack {
    spotify_data: SpotifyData;
    dataset_data: DatasetData;
}

export const useFilteredTracks = () => {
    const [filteredTracks, setFilteredTracks] = useState<FilteredTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilteredTracks = async () => {
            try {
                const response = await fetch("http://localhost:5000/filter/get-filtered-tracks");
                if (!response.ok) {
                    throw new Error("Error fetching filtered tracks");
                }
                const data = await response.json();
        
                setFilteredTracks(data.filtered_tracks || []);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };
        

        fetchFilteredTracks();
    }, []);

    return { filteredTracks, loading, error, setError };
};
