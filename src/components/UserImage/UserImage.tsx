import React from 'react';
import useUserImage from './useUserImage';
import { Link } from 'react-router-dom';
import './UserImage.scss';

interface UserImageProps {
  size?: 'sm' | 'xl';
}

const UserImage: React.FC<UserImageProps> = ({ size = 'sm' }) => {
  const { userImage, isAuthenticated } = useUserImage();

  if (!isAuthenticated) return null;

  return size === 'sm' ? (
    <Link to="/my-tracks" className="user-image user-image--sm">
      <img src={userImage || '/default-avatar.png'} alt="User Profile" />
    </Link>
  ) : (
    <div className="user-image user-image--xl">
      <img src={userImage || '/default-avatar.png'} alt="User Profile" />
    </div>
  );
};

export default UserImage;
