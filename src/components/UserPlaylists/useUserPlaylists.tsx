import { useState, useEffect } from "react";
import { Playlist } from "../../types/userSpotifyData";
import { getUserPlaylists } from "../../utils/getUserSpotifyData";

export const useUserPlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const [playlistsData] = await Promise.all([
                        getUserPlaylists()
                    ]);
    
                    setPlaylists(playlistsData.items || []);
                } catch (error) {
                    console.error("❌ Error obteniendo datos del usuario:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchUserData();
        }, []);
    
        return {playlists, loading};
}