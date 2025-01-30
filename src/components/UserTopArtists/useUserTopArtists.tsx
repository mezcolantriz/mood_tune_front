import { useState, useEffect } from "react";
import { Artist } from "../../types/userSpotifyData";
import { getUserTopArtists } from "../../utils/getUserSpotifyData";

export const useUserTopArtists = () => {
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const [playlistsData] = await Promise.all([
                        getUserTopArtists()
                    ]);

                    setTopArtists(playlistsData.items || []);
                } catch (error) {
                    console.error("❌ Error obteniendo datos del usuario:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchUserData();
        }, []);
    
        return {topArtists, loading};
}