export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Backend API

export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "TU_CLIENT_ID";
export const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || "http://localhost:5173/callback";
export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";

export const SPOTIFY_LOGIN_URL = `${API_URL}/auth/login`; // Tu backend maneja login con Spotify
export const SPOTIFY_ME_URL = `${API_URL}/auth/me`;
export const SPOTIFY_REFRESH_URL = `${API_URL}/auth/refresh`;
export const SPOTIFY_CALLBACK_URL = `${API_URL}/auth/callback`;
export const SPOTIFY_PLAYLISTS_URL = `${API_URL}/auth/playlists`;
export const SPOTIFY_TOP_TRACKS_URL = `${API_URL}/auth/top-tracks`;
export const SPOTIFY_TOP_ARTISTS_URL = `${API_URL}/auth/top-artists`;
export const SPOTIFY_FAVORITE_TRACKS_URL = `${API_URL}/auth/favorite-tracks`;
export const MOOD_SONGS_URL = `${API_URL}/auth/songs/mood`;

// URL para autenticar directamente con Spotify (por si quieres evitar el backend)
export const SPOTIFY_DIRECT_LOGIN_URL = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-modify-public%20playlist-modify-private&prompt=none`;
