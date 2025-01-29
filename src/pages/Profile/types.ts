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
