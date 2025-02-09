import { makeRequestWithToken } from "../utils/apiClient";
import { Playlist, Track, Artist, FavouriteTracks, FavouriteTracksData, TrackResponse } from "../types/userSpotifyData";

export const getUserPlaylists = async (): Promise<{ items: Playlist[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/playlists?limit=50", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las playlists del usuario");
  }

  const data = await response.json();
  return data ?? { items: [] };
};

export const getUserTopTracks = async (): Promise<{ items: Track[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/top/tracks?limit=50", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las canciones más escuchadas");
  }

  const data = await response.json();
  return data ?? { items: [] };
};

export const getUserFollowedArtists = async (): Promise<{ items: Artist[] }> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los artistas seguidos");
  }

  const data = await response.json();
  return data.artists ?? { items: [] };
};

export const getUserFavouriteTracks = async (): Promise<FavouriteTracks[]> => {
  const response = await makeRequestWithToken("https://api.spotify.com/v1/me/tracks?limit=50", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las canciones favoritas");
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
};

export const getPlaylistTracks = async (playlistId: string) => {
  try {
    const response = await makeRequestWithToken(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener canciones de la playlist: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getPlaylistTracks:", error);
    return null;
  }
};

// Peticiones a backend
const API_URL = "http://localhost:5000";

export const getFilteredTopTracks = async (tracks: Track[]): Promise<{ filtered_tracks: TrackResponse[] }> => {
  const response = await fetch(`${API_URL}/filter/filtered-top-tracks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ tracks }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener las canciones filtradas");
  }

  return await response.json();
};

export const getFilteredFollowedArtists = async (artists: Artist[]): Promise<{ filtered_artists: Artist[] }> => {
  const response = await fetch(`${API_URL}/filter/filtered-followed-artists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artists }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener los artistas filtrados");
  }

  return await response.json();
};

export const getFilteredFavouriteTracks = async (
  favouriteTracksData: FavouriteTracksData
): Promise<{ filtered_tracks: TrackResponse[] }> => {
  if (!favouriteTracksData || !favouriteTracksData.tracks) {
    throw new Error("Los datos de canciones favoritas no son válidos.");
  }

  const tracks = favouriteTracksData.tracks.map((item) => item.track);

  const response = await fetch(`${API_URL}/filter/filtered-favourite-tracks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tracks }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener las canciones favoritas filtradas");
  }

  return await response.json();
};

export const getFilteredTracks = async () => {
  const response = await fetch(`${API_URL}/filter/get-filtered-tracks`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error al obtener las canciones filtradas");
  }

  return await response.json();
};
