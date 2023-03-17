import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserGreetings from './UserGreetings';
import SendFriendRequestForm from './SendFriendRequestForm';
import { HOST_NAME, HOST_PORT } from '../domain_config';

const Home = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${HOST_NAME}:${HOST_PORT}/api/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className='bg-black text-white min-h-screen'>
      <button
        onClick={() => {
          navigate(-1);
        }}>
        ⥢
      </button>
      {users &&
        users.map((user: any) => (
          <UserGreetings
            key={user._id}
            user={user}
          />
        ))}
      <Link to='/match/123'>
        <button>Play</button>
      </Link>
      <SendFriendRequestForm />
    </main>
  );
};

export default Home;
