import React from "react"
import { useUserFavouriteTracks } from "./useUserFavouriteTracks"

const UserFavouriteTracks: React.FC = () => {
    const {favouriteTracks, loading} = useUserFavouriteTracks();
    if (loading) return <div>Cargando datos...</div>;

    return (
        <>
            <h2>💖 Your Saved Songs</h2>
            <ul>
              {favouriteTracks.map(({ added_at, track }) => (
                <li key={track.id}>
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                  />
                  <strong>{track.name}</strong> - {track.artists.map((artist) => artist.name).join(", ")} (
                  {track.album.name})<br />
                  Guardada el: {new Date(added_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
        </>
    )
}

export default UserFavouriteTracks;