export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface UserProfile {
    display_name: string;
    id: string;
    email?: string;
    images?: { url: string }[];
    followers?: { total: number };
    country?: string;
}