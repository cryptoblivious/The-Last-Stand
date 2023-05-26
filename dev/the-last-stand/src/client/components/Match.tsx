//  Nom du fichier : Match.tsx
//  Contexte : Un composant React qui permet d'afficher le canevas du jeu Phaser
//  Nom des auteurs : Jonathan Robinson-Roberge et Andrzej Wisniowski
//  Référence : https://chat.openai.com/ - https://phaser.io

import { useEffect, useRef, useState, useContext } from 'react';
import Phaser from 'phaser';
import Bootstrap from '../match/scenes/Bootstrap';
import ClientMatch from '../match/scenes/ClientMatch';
import Hud from '../match/scenes/Hud';
import { ColyseusContext } from './ColyseusProvider';
import { useNavigate } from 'react-router-dom';

const Match = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const { client, user, userGameOptions } = useContext(ColyseusContext);
  const navigate = useNavigate();
  const [inGame, setInGame] = useState(false);

  useEffect(() => {
    if (!client) {
      return;
    }
    const username = user?.username;
    const userNo = user?.userNo;
    const selectedCharacter = userGameOptions?.selectedCharacter;
    const selectedScene = userGameOptions?.selectedScene;

    const bootstrap = (Bootstrap as any).bind(null, client, { username, userNo, selectedCharacter, selectedScene });
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
          debug: false,
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
    setInGame(true);
    return () => {
      newGame.destroy(true);
      setGame(null);
      setInGame(false);
    };
  }, [client]);

  useEffect(() => {
    const wasInGame = localStorage.getItem('wasInGame');

    if (wasInGame) {
      navigate('/gameLobby');
      localStorage.removeItem('wasInGame');
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (inGame) {
        localStorage.setItem('wasInGame', 'true');
      }
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [inGame]);

  return (
    <div
      className='bg-black h-screen flex justify-center '
      id='match-canvas'
      ref={gameRef}
    />
  );
};

export default Match;
