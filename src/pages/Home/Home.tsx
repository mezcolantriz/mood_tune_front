import React from 'react';
import './Home.scss';
import MoodForm from '../../components/MoodForm/MoodForm';

const handleAnalyzeMood = (moodText: string, genre?: string) => {
  console.log("Analizando mood:", moodText);
  if (genre) {
    console.log("Género seleccionado:", genre);
  }
  // Aquí podrías llamar a tu API o función para analizar sentimientos y devolver canciones.
};

const handleGetSurprisePlaylist = () => {
  console.log("Obteniendo playlist fuera de hábitos...");
  // Aquí podrías hacer una petición a tu backend para obtener una playlist aleatoria.
};

const Home: React.FC = () => {
  return (
    <div className="home">
      <MoodForm onAnalyzeMood={handleAnalyzeMood} onGetSurprisePlaylist={handleGetSurprisePlaylist} />
    </div>
  );
};

export default Home;
