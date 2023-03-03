
import React ,{ useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerGreeting, SendFriendRequestForm } from '../components';

const Home = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch('http://localhost:9001/api/players');
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <main>
      <button
        className='bg-primary h-full w-full text-white'
        onClick={() => {
          navigate(-1);
        }}>
        ⥢
      </button>
      <h1>Home</h1>
      {players &&
        players.map((player: any) => (
          <PlayerGreeting
            key={player._id}
            player={player}
          />
        ))}
      <SendFriendRequestForm />
    </main>
  );
};

export default Home;
