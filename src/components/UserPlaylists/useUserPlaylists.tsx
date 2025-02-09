import { useState, useEffect } from "react";
import { Playlist, Track } from "../../types/userSpotifyData";
import { getUserPlaylists, getPlaylistTracks } from "../../hooks/getUserSpotifyData";

export const useUserPlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [moodTuneTracks, setMoodTuneTracks] = useState<Record<string, Track[]>>({});
    const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (fetched) return;

        const fetchUserData = async () => {
            try {
                const playlistsData = await getUserPlaylists();
                const filteredPlaylists = playlistsData?.items?.filter(
                    (playlist: Playlist) => playlist.description === "Playlist generada por MoodTune"
                ) ?? [];
                setPlaylists(filteredPlaylists);

                const tracksMap: Record<string, Track[]> = {};
                for (const playlist of filteredPlaylists) {
                    const tracksData = await getPlaylistTracks(playlist.id);
                    tracksMap[playlist.id] = tracksData?.items?.map((item: { track: Track }) => item.track) ?? [];
                }
                setMoodTuneTracks(tracksMap);
                setFetched(true);
            } catch (error) {
                console.error("Error fetching playlists:", error);
                setError("Hubo un problema obteniendo tus playlists. Intenta nuevamente más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [fetched]);

    const togglePlaylist = (playlistId: string) => {
        setExpandedPlaylist(prev => (prev === playlistId ? null : playlistId));
    };

    return { playlists, moodTuneTracks, expandedPlaylist, togglePlaylist, loading, error, setError };
};
