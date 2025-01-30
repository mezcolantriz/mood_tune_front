import { useState, useEffect } from "react";
import { Track } from "../../types/userSpotifyData";
import { getUserTopTracks } from "../../utils/getUserSpotifyData";

export const useUserTopTracks = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const [topTracksData] = await Promise.all([
                        getUserTopTracks()
                    ]);
    
                    setTopTracks(topTracksData.items || []);
                } catch (error) {
                    console.error("❌ Error obteniendo datos del usuario:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchUserData();
        }, []);
    
        return {topTracks, loading};
}