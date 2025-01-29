import { makeRequestWithToken } from "./apiClient";
import { SPOTIFY_PLAYLISTS_URL, SPOTIFY_TOP_TRACKS_URL, SPOTIFY_TOP_ARTISTS_URL, SPOTIFY_FAVORITE_TRACKS_URL } from "../config";

export const getUserPlaylists = async () => {
    const response = await makeRequestWithToken(SPOTIFY_PLAYLISTS_URL);
    return response.json();
};

export const getTopTracks = async () => {
    const response = await makeRequestWithToken(SPOTIFY_TOP_TRACKS_URL);
    return response.json();
};

export const getTopArtists = async () => {
    const response = await makeRequestWithToken(SPOTIFY_TOP_ARTISTS_URL);
    return response.json();
};

export const getFavoriteTracks = async () => {
    const response = await makeRequestWithToken(SPOTIFY_FAVORITE_TRACKS_URL);
    return response.json();
};
