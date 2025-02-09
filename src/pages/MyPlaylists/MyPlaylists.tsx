import React from "react";
import UserPlaylists from "../../components/UserPlaylists/UserPlaylists";
import "./MyPlaylists.scss";

const MyPlaylists: React.FC = () => {
    return (
        <section className="my-playlists">
            <h2 className="my-playlists__title">Your Playlists</h2>
            <UserPlaylists />
        </section>
    );
};

export default MyPlaylists;
