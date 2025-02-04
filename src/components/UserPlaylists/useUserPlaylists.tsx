import { useState, useEffect } from "react";
import { Playlist } from "../../types/userSpotifyData";
import { getUserPlaylists } from "../../hooks/getUserSpotifyData";

export const useUserPlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const playlistsData = await getUserPlaylists();
                setPlaylists(playlistsData?.items ?? []);
            } catch (error) {
                setError(`Hubo un problema obteniendo tus playlists. Intenta nuevamente más tarde: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return { playlists, loading, error, setError };
};
