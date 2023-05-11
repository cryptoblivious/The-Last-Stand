import { useContext, useEffect } from 'react';
import FriendInfoCard from './FriendInfoCard';
import { ColyseusContext } from './ColyseusProvider';

// TODO : Add collection stream to update friend list in real time
const FriendList = () => {
  //const [users, setUsers] = useState<null | any[]>(null);à
  const { users } = useContext(ColyseusContext);
  console.log('users', users);

  useEffect(() => {
    console.log('friendlist rerendered', users);
    // TODO : Add collection stream to update friend list in real time
  }, [users]);

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
