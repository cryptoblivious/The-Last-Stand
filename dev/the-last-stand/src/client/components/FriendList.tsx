import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FriendInfoCard from './FriendInfoCard';
import { HOST_NAME, HOST_PORT } from '../domain_config';

const Home = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${HOST_NAME}:${HOST_PORT}/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {users &&
        users.map((user: any) => (
          <FriendInfoCard
            key={user._id}
            user={user}
          />
        ))}
    </>
  );
};

export default Home;
