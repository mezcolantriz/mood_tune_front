import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Welcome to MoodTune</h1>
      <p>Your moods, your playlists.</p>
    </div>
  );
};

export default Home;
