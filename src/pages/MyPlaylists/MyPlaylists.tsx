import React from "react";
import UserPlaylists from "../../components/UserPlaylists/UserPlaylists";
import "./MyPlaylists.scss"

const MyPlaylists: React.FC = () => {
    return (
        <div className="my-playlists">
            <UserPlaylists />
        </div>
    );
};

export default MyPlaylists;
