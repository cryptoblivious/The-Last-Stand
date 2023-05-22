import { useEffect, useRef, useState, useContext } from 'react';
import Phaser from 'phaser';
import Bootstrap from '../match/scenes/Bootstrap';
import ClientMatch from '../match/scenes/ClientMatch';
import Hud from '../match/scenes/Hud';
import { ColyseusContext } from './ColyseusProvider';

const Match = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const { client, appRoom, user } = useContext(ColyseusContext);

  useEffect(() => {
    if (!client) {
      return;
    }
    const username = user?.username;
    const userNo = user?.userNo;
    const bootstrap = (Bootstrap as any).bind(null, client, {username, userNo} );
    const matchCanvas = document.createElement('div');
    matchCanvas.id = 'match-canvas';
    gameRef.current?.appendChild(matchCanvas);

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 992,
      height: 608,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
          debug: true,
          debugShowBody: true,
          debugShowStaticBody: true,
          debugShowVelocity: true,
          debugBodyColor: 0xff0000,
          debugStaticBodyColor: 0x0000ff,
          debugVelocityColor: 0x00ff00,
        },
      },
      scene: [bootstrap, ClientMatch, Hud],
      parent: 'match-canvas',
    };

    const newGame = new Phaser.Game(config);
    setGame(newGame);
    return () => {
      newGame.destroy(true);
      setGame(null);
    };
  }, [client]);

  return (
    <div
      className='bg-black h-screen flex justify-center '
      id='match-canvas'
      ref={gameRef}
    />
  );
};

export default Match;
