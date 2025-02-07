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

export type TrackResponse = {
    dataset_data?: {
        artist_name: string;
        combined_genres: string;
        danceable: string;
        male: string;
        mood_acoustic: string;
        mood_aggressive: string;
        mood_electronic: string;
        mood_happy: string;
        mood_party: string;
        mood_relaxed: string;
        mood_sad: string;
        recording_id: string;
        song_name: string;
        timbre_bright: string;
        tonal: string;
    };
    spotify_data?: {
        album: string;
        artist: string;
        duration_ms: number;
        original_name: string;
        popularity: number;
        spotify_url: string;
        picture: string;
    };
};
