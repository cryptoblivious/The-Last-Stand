import { useEffect, useState } from 'react';
import FriendInfoCard from './FriendInfoCard';
import { HOST_URL, HOST_PORT } from '../domain_config';

const FriendList = () => {
  const [users, setUsers] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${HOST_URL}:${HOST_PORT}/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    };

    fetchUsers();
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
