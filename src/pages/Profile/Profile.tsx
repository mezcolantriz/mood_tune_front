import React from "react";
import UserPlaylists from "../../components/UserPlaylists/UserPlaylists";
import UserTopTracks from "../../components/UserTopTracks/UserTopTracks";
import UserTopArtists from "../../components/UserFollowedArtists/UserFollowedArtists";
import UserFavouriteTracks from "../../components/UserFavouriteTracks/UserFavouriteTracks";

const Profile: React.FC = () => {
    return (
        <>
            <UserPlaylists />
            <UserTopTracks />
            <UserTopArtists />
            <UserFavouriteTracks />
        </>
    );
};

export default Profile;
