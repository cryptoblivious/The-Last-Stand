import { useEffect, useState } from 'react';
import FriendInfoCard from './FriendInfoCard';
import { getUsers } from '../fetches/users';
// TODO : Add collection stream to update friend list in real time
const FriendList = () => {
  const [users, setUsers] = useState<null | any[]>(null);

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      setUsers(users);
    }
    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-1'>
      <h1>Friend List</h1>
      {users &&
        users.map((user: any) => (
          <FriendInfoCard
            key={user._id}
            user={user}
          />
        ))}
    </div>
  );
};

export default FriendList;
