import { useEffect, useState } from 'react';
import { SERVER_PORT } from '../../common/constants';

const UserGreetings = () => {
  const [user, setUser] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:${SERVER_PORT}/users/current`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      }
      console.log(data);
    };
    //   const fetchUser = async () => {
    //     const cookie = "mycookie=123"; // replace with your cookie name and value
    //     const options = {
    //       headers: {
    //         "Cookie": cookie
    //       }
    //     };

    //     const response = await fetch(`http://localhost:${SERVER_PORT}/users/current`, options);
    //     const data = await response.json();

    //     if (response.ok) {
    //       setUser(data);
    //     }
    //     console.log(data);
    //   };
    // };

    fetchUser();
  }, []);
  return <div>{user && <h4>{`Welcome, ${user.username}#${user.userNo ?? '0000'}, ${user.title ?? ''}!!!`}</h4>}</div>;
};

export default UserGreetings;
