import React, { useContext } from "react";
import { FilteredTracksContext } from "../../context/FilteredTracksContext/FilteredTracksContext";
import UserFavouriteTracks from "../../components/UserFavouriteTracks/UserFavouriteTracks";

import "./MyTracks.scss";

const MyTracks: React.FC = () => {
    const context = useContext(FilteredTracksContext);

    if (!context) {
        return <p>Error: Contexto no encontrado. Asegúrate de que `FilteredTracksProvider` envuelve la aplicación.</p>;
    }

    const { topTracks, favouriteTracks, loading, error } = context;

    return (
        <div className="my-tracks-container">
            <h2>Mis Canciones Filtradas</h2>

            <section>
                <h3>Top Tracks</h3>
                {loading ? (
                    <p>Cargando tus canciones...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : topTracks.length > 0 ? (
                    <ul>
                        {topTracks.map((track, index) => (
                            <li key={track.spotify_data?.spotify_url || track.dataset_data?.recording_id || index}>
                                {track.spotify_data ? (
                                    <a href={track.spotify_data.spotify_url} target="_blank" rel="noopener noreferrer">
                                        {track.spotify_data.original_name} - {track.spotify_data.artist}
                                    </a>
                                ) : (
                                    <span>Datos incompletos</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay Top Tracks disponibles.</p>
                )}
            </section>


            <section>
                <h3>Favourite Tracks</h3>
                <UserFavouriteTracks
                    favouriteTracks={favouriteTracks}
                    loading={loading}
                    error={error}
                />
            </section>
        </div>
    );
};

export default MyTracks;
