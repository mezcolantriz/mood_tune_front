import React from 'react';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <h1>Your Profile</h1>
      <p>Here are your stats and information.</p>
    </div>
  );
};

export default Profile;
