import { useEffect, useRef, useState, useContext } from 'react';
import Phaser from 'phaser';
import Bootstrap from '../match/scenes/Bootstrap';
import ClientMatch from '../match/scenes/ClientMatch';
import Hud from '../match/scenes/Hud';
import { ColyseusContext } from './ColyseusProvider';

const Match = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const { client, user, userGameOptions } = useContext(ColyseusContext);
  
  
  useEffect(() => {
    if (!client)  {
      return;
    }
    const username = user?.username;
    const userNo = user?.userNo;
    const selectedCharacter = userGameOptions?.selectedCharacter;
    const selectedScene = userGameOptions?.selectedScene;
    
    const bootstrap = (Bootstrap as any).bind(null, client, {username, userNo, selectedCharacter, selectedScene} );
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

  useEffect(() => {
    const handleBeforeUnload = (event:any) => {
      event.preventDefault();
      event.returnValue = ''; // This empty string is necessary for modern browsers
    };

    const handlePopstate = (event:any) => {
      event.preventDefault();
      const confirmationMessage = 'Are you sure you want to leave the game?';
      event.returnValue = confirmationMessage; // Display the confirmation message

      // Optionally, you can show a custom confirmation dialog using `window.confirm()`
      // const confirmed = window.confirm(confirmationMessage);
      // if (!confirmed) {
      //   history.pushState(null, null, window.location.pathname); // Restore the current state
      // }
    };

    // Attach the event listeners when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopstate);

    // Remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div
      className='bg-black h-screen flex justify-center '
      id='match-canvas'
      ref={gameRef}
    />
  );
};

export default Match;
