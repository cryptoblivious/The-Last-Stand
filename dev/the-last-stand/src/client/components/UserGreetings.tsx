import { useEffect, useState } from 'react';
import { HOST_URL, HOST_PORT } from '../domain_config';

const UserGreetings = () => {
  const [user, setUser] = useState<null | any[]>(null);

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

  return <div>{user && <h4>{`Welcome, ${user.username}#${user.userNo ?? '0000'}, ${user.title ?? ''}!!!`}</h4>}</div>;
};

export default UserGreetings;
