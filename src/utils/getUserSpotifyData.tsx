import { makeRequestWithToken } from "./apiClient";
import { Playlist, Track, Artist, FavouriteTracks } from "../types/userSpotifyData";

export const getUserPlaylists = async (): Promise<{ items: Playlist[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/playlists?limit=50");
  return response.ok ? response.json() : { items: [] };
};

export const getUserTopTracks = async (): Promise<{ items: Track[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/top/tracks?limit=50");
  return response.ok ? response.json() : { items: [] };
};

export const getUserTopArtists = async (): Promise<{ items: Artist[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/top/artists?limit=50");
  
  return response.ok ? response.json() : { items: [] };
};

export const getUserFavouriteTracks = async (): Promise<FavouriteTracks[]> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/tracks?limit=50");
  if (!response.ok) return [];

  const data = await response.json();

  return Array.isArray(data.items) ? (data.items as FavouriteTracks[]) : [];
};