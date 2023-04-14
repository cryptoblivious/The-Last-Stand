import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import Bootstrap from '../match/scenes/Bootstrap';
import ClientMatch from '../match/scenes/ClientMatch';

const Match = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) {
      const matchCanvas = document.createElement('div');
      matchCanvas.id = 'match-canvas';
      gameRef.current.appendChild(matchCanvas);

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 992,
        height: 608,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: [Bootstrap, ClientMatch],
        parent: 'match-canvas',
      };

      const newGame = new Phaser.Game(config);
      setGame(newGame);
      return () => {
        newGame.destroy(true);
        setGame(null);
      };
    }
  }, [gameRef]);

  return (
    <div
      className='bg-black h-screen flex justify-center '
      id='match-canvas'
      ref={gameRef}
    />
  );
};

export default Match;
