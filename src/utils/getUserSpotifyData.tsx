import { makeRequestWithToken } from "./apiClient";
import { Playlist, Track, Artist, FavouriteTracks } from "../types/userSpotifyData";

export const getUserPlaylists = async (): Promise<{ items: Playlist[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/playlists?limit=10");

  if (!response.ok) {
    throw new Error("Error al obtener las playlists del usuario");
  }

  const data = await response.json();
  return data ?? { items: [] };
};

export const getUserTopTracks = async (): Promise<{ items: Track[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/top/tracks?limit=10");

  if (!response.ok) {
    throw new Error("Error al on getting top songs");
  }

  const data = await response.json();
  return data ?? { items: [] };
};


export const getUserFollowedArtists = async (): Promise<{ items: Artist[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/following?type=artist&limit=10");

  if (!response.ok) {
    throw new Error("Error on getting followed artists");
  }

  const data = await response.json();
  return data.artists ?? { items: [] };
};

export const getUserFavouriteTracks = async (): Promise<FavouriteTracks[]> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/tracks?limit=10");

  if (!response.ok) {
    throw new Error("Error on getting user favourite tracks");
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
};
