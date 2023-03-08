import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayerGreeting, SendFriendRequestForm } from '../components';
import { PORT } from '../common/constants';

const Home = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<null | any[]>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch(`http://localhost:${PORT}/api/players`);
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
        onClick={() => {
          navigate(-1);
        }}>
        ⥢
      </button>
      {players &&
        players.map((player: any) => (
          <PlayerGreeting
            key={player._id}
            player={player}
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
