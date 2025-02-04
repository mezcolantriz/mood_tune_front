export interface Playlist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    external_urls: { spotify: string };
    tracks: { total: number };
}

export interface Artist {
    id: string;
    name: string;
    images?: { url: string }[];
    external_urls: { spotify: string };
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    images: { url: string; height?: number; width?: number }[];
}

export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: SpotifyAlbum;
    duration_ms: number;
    popularity: number;
    external_urls: { spotify: string };
    preview_url: string | null;
}

export interface UserData {
    playlists: Playlist[];
    topTracks: Track[];
    topArtists: Artist[];
    favoriteTracks: Track[];
    loading: boolean;
}

export interface FavouriteTracks {
    added_at: string;
    track: Track;
}

export interface FavouriteTracksData {
    tracks: FavouriteTracks[];
}
