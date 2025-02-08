import { useState, useEffect } from "react";
import { getFilteredTracks } from "../../hooks/getUserSpotifyData";

interface Track {
    artist_name: string;
    song_name: string;
    recording_id: string;
    danceable: number;
    male: number;
    timbre_bright: number;
    tonal: number;
    instrumental: number;
    mood_acoustic: number;
    mood_aggressive: number;
    mood_electronic: number;
    mood_happy: number;
    mood_party: number;
    mood_relaxed: number;
    mood_sad: number;
    combined_genres: string;
}

const FilteredTracks = () => {
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await getFilteredTracks();
                
                if (Array.isArray(data)) {
                    setTracks(data);
                } else if (data && Array.isArray(data.filtered_tracks)) {
                    setTracks(data.filtered_tracks);
                } else {
                    setTracks([]);
                }
            } catch (error) {
                console.error("Error:", error);
                setTracks([]);
            }
        };

        fetchTracks();
    }, []);

    return (
        <div>
            <h2>🎵 Canciones Filtradas</h2>
            {tracks.length === 0 ? (
                <p>No hay canciones filtradas.</p>
            ) : (
                <ul>
                    {tracks.map((track, index) => (
                        <li key={`${track.recording_id}-${index}`}>
                            {track.artist_name} - {track.song_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilteredTracks;
