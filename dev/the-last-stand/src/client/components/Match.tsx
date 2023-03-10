import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import Bootstrap from '../match/scenes/Bootstrap';
import MatchScene from '../match/scenes/ClientMatch';

// const config: Phaser.Types.Core.GameConfig = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 200 },
//     },
//   },
//   scene: [Bootstrap, Game],
// };

// export default new Phaser.Game(config);

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
        width: window.innerWidth,
        height: window.innerHeight,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: [Bootstrap, MatchScene],
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
      id='match-canvas'
      ref={gameRef}
    />
  );
};

export default Match;
