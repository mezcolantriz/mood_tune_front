import { useState, useEffect } from "react";
import { FavouriteTracks } from "../../types/userSpotifyData";
import { getUserFavouriteTracks } from "../../utils/getUserSpotifyData";

export const useUserFavouriteTracks = () => {
    const [favouriteTracks, setFavouriteTracks] = useState<FavouriteTracks[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const [favouriteTracksData] = await Promise.all([
                        getUserFavouriteTracks() 
                    ]);
    
                    setFavouriteTracks(favouriteTracksData || []);
                } catch (error) {
                    console.error("❌ Error obteniendo datos del usuario:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchUserData();
        }, []);
    
        return {favouriteTracks, loading};
}