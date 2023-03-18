import { useEffect, useState } from 'react';
import { HOST_URL, HOST_PORT } from '../domain_config';
import { IUser } from '../../typescript/interfaces/IUser';
import EditButton from './EditButton';
import { APP_MODE } from '../domain_config';

const icon = APP_MODE === 'dev' ? './src/client/assets/heroes/chuck/avatar.png' : './assets/heroes/chuck/avatar.png';

const UserInfoCard = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    console.log('edit');
  };

  return (
    user && (
      <div
        className='flex gap-4 w-full h-fit p-4 hover:bg-violet-900 justify-between transition ease-in-out duration-300'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className='flex w-3/4 gap-4'>
          <img
            className='border-purple-900 h-24 border-2 rounded-full'
            src={icon}></img>
          <div className='flex flex-col gap-2 justify-center w-80'>
            <h4>
              {`${user.username}`}
              <span className='text-pink-800'>{`#${user.userNo ?? '0000'}`}</span>
            </h4>
            <h4>{`${user.title}`}</h4>
          </div>
        </div>
        <div className='flex justify-end items-start p-4'>
          {isHovered && (
            <EditButton
              className='w-fit h-fit'
              onClick={handleEdit}
            />
          )}
        </div>
      </div>
    )
  );
};

export default UserInfoCard;
