import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  const [players, setPlayers] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch('http://localhost:4000/api/players');
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <>
      <Navbar />
      <main className='background-'>
        <h1 className='align-middle w-full self-center'>Login</h1>
        {players &&
          players.map((player: any) => (
            <div key={player._id}>
              <h2>{player.username}</h2>
            </div>
          ))}
      </main>
    </>
  );
};

export default Login;
