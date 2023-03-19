import { useEffect, useState } from 'react';
import { HOST_URL, HOST_PORT } from '../domain_config';
import { IUser } from '../../typescript/interfaces/IUser';
import EditButton from './EditButton';
import ShowUserInfo from './ShowUserInfo';
import EditUserInfo from './EditUserInfo';

import { APP_MODE } from '../domain_config';
const avatar = APP_MODE === 'dev' ? './src/client/assets/heroes/chuck/avatar.png' : 'https://picsum.photos/500/600';

const UserInfoCard = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/current`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log('edit');
  };

  return (
    user && (
      <div
        className='flex gap-4 w-full h-fit justify-evenly rounded-tl-3xl transition ease-in-out duration-300'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <EditButton
          className={`absolute top-2 left-1 w-fit h-fit ${isHovered ? 'opacity-100' : 'opacity-0'} transition duration-1000`}
          onClick={handleEdit}
        />
        {isEditing ? (
          <EditUserInfo
            className={`${isEditing} ? 'z-10' : ''}`}
            user={user}
          />
        ) : (
          <ShowUserInfo
            className={`${!isEditing} ? 'z-10' : ''}`}
            user={user}
          />
        )}
      </div>
    )
  );
};

export default UserInfoCard;
