import { useEffect, useState } from 'react';
import { HOST_URL, HOST_PORT } from '../domain_config';
import { IUser } from '../../typescript/interfaces/IUser';

const UserInfoCard = () => {
  const [user, setUser] = useState<IUser | null>(null);

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

  return (
    user && (
      <div className='flex gap-4 w-full h-10'>
        <img
          className='h-full w-10 transform scale-150 border-purple-900 border-2 rounded-full'
          src='./src/client/assets/heroes/chuck/avatar.png'></img>
        <div className='flex flex-col gap-2 justify-center w-80'>
          <h4>
            {`${user.username}`}
            <span className='text-pink-800'>{`#${user.userNo ?? '0000'}`}</span>
          </h4>
          <h4>{`${user.title}`}</h4>
        </div>
      </div>
    )
  );
};

export default UserInfoCard;
