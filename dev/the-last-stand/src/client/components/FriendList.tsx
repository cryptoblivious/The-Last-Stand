import { useContext, useEffect } from 'react';
import FriendInfoCard from './FriendInfoCard';
import { ColyseusContext } from './ColyseusProvider';

const FriendList = () => {
  const { users } = useContext(ColyseusContext);

  return (
    <div className='flex flex-col gap-1 w-full'>
      <h1>Friend List</h1>
      {users &&
        users.map(
          (user: any) =>
            user && (
              <FriendInfoCard
                key={user._id}
                user={user}
              />
            )
        )}
    </div>
  );
};

export default FriendList;
