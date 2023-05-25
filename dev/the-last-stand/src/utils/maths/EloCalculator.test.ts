//  Nom du fichier : EloCalculator.test.ts
//  Contexte : Fichier de test pour la classe EloCalculator
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/

import { EloCalculator, PlayerElo, PlayerEloResult } from './EloCalculator'
import HashMap from '../data_structures/HashMap'
import { expect, test } from 'vitest'

test('Elo should increase after a win in a casual 2-player game', () => {
    const player1: PlayerElo = { id: 'player1', elo: 1200 }
    const player2: PlayerElo = { id: 'player2', elo: 1400 }

    const playerResults = new HashMap<string, PlayerEloResult>()
    playerResults.set(player1.id, { player: player1, outcome: 1 })
    playerResults.set(player2.id, { player: player2, outcome: 2 })

    const eloCalculator = new EloCalculator()
    const newElos = eloCalculator.calculateElo('casual', 2, playerResults)

    const newEloPlayer1 = newElos.get(player1.id)
    expect(newEloPlayer1).toBeGreaterThan(player1.elo)
})

test('Elo should decrease after a loss in a ranked 2-player game', () => {
    const player1: PlayerElo = { id: 'player1', elo: 1400 }
    const player2: PlayerElo = { id: 'player2', elo: 1200 }

    const playerResults = new HashMap<string, PlayerEloResult>()
    playerResults.set(player1.id, { player: player1, outcome: 2 })
    playerResults.set(player2.id, { player: player2, outcome: 1 })

    const eloCalculator = new EloCalculator()
    const newElos = eloCalculator.calculateElo('ranked', 2, playerResults)

    const newEloPlayer1 = newElos.get(player1.id)
    expect(newEloPlayer1).toBeLessThan(player1.elo)
})

test('Elo change should be larger in a ranked 3-player game', () => {
    const player1: PlayerElo = { id: 'player1', elo: 1200 }
    const player2: PlayerElo = { id: 'player2', elo: 1300 }
    const player3: PlayerElo = { id: 'player3', elo: 1400 }

    const playerResults = new HashMap<string, PlayerEloResult>()
    playerResults.set(player1.id, { player: player1, outcome: 1 })
    playerResults.set(player2.id, { player: player2, outcome: 2 })
    playerResults.set(player3.id, { player: player3, outcome: 3 })

    const eloCalculator = new EloCalculator()
    const newElos = eloCalculator.calculateElo('ranked', 3, playerResults)

    const newEloPlayer1 = newElos.get(player1.id)
    expect(newEloPlayer1).toBeGreaterThan(player1.elo + 10)  // Adjust this value according to your K factor and other parameters
})

test('Elo change should be larger in a ranked 4-player game', () => {
    const player1: PlayerElo = { id: 'player1', elo: 1200 }
    const player2: PlayerElo = { id: 'player2', elo: 1300 }
    const player3: PlayerElo = { id: 'player3', elo: 1400 }
    const player4: PlayerElo = { id: 'player4', elo: 1500 }

    const playerResults = new HashMap<string, PlayerEloResult>()
    playerResults.set(player1.id, { player: player1, outcome: 1 })
    playerResults.set(player2.id, { player: player2, outcome: 2 })
    playerResults.set(player3.id, { player: player3, outcome: 3 })
    playerResults.set(player4.id, { player: player4, outcome: 4 })

    const eloCalculator = new EloCalculator()
    const newElos = eloCalculator.calculateElo('ranked', 4, playerResults)

    const newEloPlayer1 = newElos.get(player1.id)
    expect(newEloPlayer1).toBeGreaterThan(player1.elo + 10)  // Adjust this value according to your K factor and other parameters
})

test ('players with the same starting elo should have the same elo order as winner order', () => {
    const player1: PlayerElo = { id: 'player1', elo: 1200 }
    const player2: PlayerElo = { id: 'player2', elo: 1200 }
    const player3: PlayerElo = { id: 'player3', elo: 1200 }
    const player4: PlayerElo = { id: 'player4', elo: 1200 }

    const playerResults = new HashMap<string, PlayerEloResult>()
    playerResults.set(player1.id, { player: player1, outcome: 1 })
    playerResults.set(player2.id, { player: player2, outcome: 2 })
    playerResults.set(player3.id, { player: player3, outcome: 3 })
    playerResults.set(player4.id, { player: player4, outcome: 4 })

    const eloCalculator = new EloCalculator()
    const newElos = eloCalculator.calculateElo('ranked', 4, playerResults)

    const newEloPlayer1 = newElos.get(player1.id)
    const newEloPlayer2 = newElos.get(player2.id)
    const newEloPlayer3 = newElos.get(player3.id)
    const newEloPlayer4 = newElos.get(player4.id)

    expect(newEloPlayer1).toBeGreaterThan(newEloPlayer2!)
    expect(newEloPlayer2).toBeGreaterThan(newEloPlayer3!)
    expect(newEloPlayer3).toBeGreaterThan(newEloPlayer4!)
})

test('Elo should decrease for the loser in a 4-player ranked game', () => {
    const player1 = { id: '1', elo: 1200 };
    const player2 = { id: '2', elo: 1300 };
    const player3 = { id: '3', elo: 1400 };
    const player4 = { id: '4', elo: 1500 };

    const playerResults = new HashMap<string, PlayerEloResult>();
    playerResults.set(player1.id, { player: player1, outcome: 1 });
    playerResults.set(player2.id, { player: player2, outcome: 2 });
    playerResults.set(player3.id, { player: player3, outcome: 3 });
    playerResults.set(player4.id, { player: player4, outcome: 4 });

    const calculator = new EloCalculator();
    const newElos = calculator.calculateElo('ranked', 4, playerResults);

    const newEloPlayer4 = newElos.get(player4.id);
    expect(newEloPlayer4).toBeLessThan(player4.elo);
  });

  test('two players with zero ratings (casual)', () => {
    const player1: PlayerElo = { id: '1', elo: 0 };
    const player2: PlayerElo = { id: '2', elo: 0 };

    const players = new HashMap<string, PlayerEloResult>();
    players.set(player1.id, { player: player1, outcome: 1 });
    players.set(player2.id, { player: player2, outcome: 2 });

    const calculator = new EloCalculator();
    const newElos = calculator.calculateElo('casual', 2, players);

    const newEloPlayer1 = newElos.get(player1.id);
    expect(newEloPlayer1).toBeGreaterThan(player1.elo);

    const newEloPlayer2 = newElos.get(player2.id);
    expect(newEloPlayer2).toEqual(player2.elo); // elo should not change because it cant go below 0
});

test('two players, one with zero rating and one with a positive rating (ranked)', () => {
    const player1: PlayerElo = { id: '1', elo: 0 };
    const player2: PlayerElo = { id: '2', elo: 1000 };

    const players = new HashMap<string, PlayerEloResult>();
    players.set(player1.id, { player: player1, outcome: 1 });
    players.set(player2.id, { player: player2, outcome: 2 });

    const calculator = new EloCalculator();
    const newElos = calculator.calculateElo('ranked', 2, players);

    const newEloPlayer1 = newElos.get(player1.id);
    expect(newEloPlayer1).toBeGreaterThan(player1.elo);

    const newEloPlayer2 = newElos.get(player2.id);
    expect(newEloPlayer2).toBeLessThan(player2.elo);
});