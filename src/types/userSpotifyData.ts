export interface Playlist {
    id: string;
    name: string;
}

export interface Artist {
    id: string;
    name: string;
}

export interface Track {
    id: string;
    name: string;
    artists: Artist[];
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
    track: {
        id: string;
        name: string;
        album: {
            id: string;
            name: string;
            images: { url: string; height?: number; width?: number }[];
        };
        artists: {
            id: string;
            name: string;
        }[];
        duration_ms: number;
        popularity: number;
    };
}
