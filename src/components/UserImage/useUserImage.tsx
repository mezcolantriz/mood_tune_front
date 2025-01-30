import { useState, useEffect } from 'react';

const useUserImage = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Error fetching Spotify profile');

        const data = await response.json();
        setUserImage(data.images?.[0]?.url || null);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { userImage, isAuthenticated };
};

export default useUserImage;
