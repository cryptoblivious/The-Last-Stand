import { useEffect, useState } from 'react';
import { SERVER_PORT } from '../../common/constants';

const UserGreetings = () => {
  const [user, setUser] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:${SERVER_PORT}/api/users/current`);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUser(data);
      } else {
        console.log(data);
      }
    };

    fetchUser();
  }, []);
  return <div>{user}</div>;
  //return <div>{user && <h4>{`Welcome, ${user.username}#${user.userNo}, ${user.title !== undefined && user.title}!!!`}</h4>}</div>;
};

export default UserGreetings;
