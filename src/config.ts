export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const SPOTIFY_LOGIN_URL = `${API_URL}/auth/login`;
export const SPOTIFY_ME_URL = `${API_URL}/auth/me`;
export const SPOTIFY_REFRESH_URL = `${API_URL}/auth/refresh`;
export const SPOTIFY_CALLBACK_URL = `${API_URL}/auth/callback`;

console.log(import.meta.env.VITE_BACKEND_URL);
console.log(SPOTIFY_CALLBACK_URL);
