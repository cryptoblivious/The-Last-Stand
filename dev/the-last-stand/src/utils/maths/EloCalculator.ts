//  Nom du fichier : EloCalculator.ts
//  Contexte : Classe servant a calculer le mmr des joueurs apres une partie
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/

import HashMap from "../data_structures/HashMap";

export interface PlayerElo {
    id: string;
    elo: number;
}

export interface PlayerEloResult {
    player: PlayerElo;
    outcome: 1 | 2 | 3 | 4;
}

export class EloCalculator {
    private K: number;
    private gameModeFactors: { [mode in 'casual' | 'ranked']: number };
    private playerCountFactors: { [count in 2 | 3 | 4]: number };
    private playerOutCome: { [outcome in 1 | 2 | 3 | 4]: number };
    private eloDivisor: number;
    private eloPower: number;

    constructor(K: number = 32, eloDivisor: number = 400, eloPower: number = 10) {
        this.K = K;
        this.eloDivisor = eloDivisor;
        this.eloPower = eloPower;

        this.gameModeFactors = {
            'casual': 1,
            'ranked': 1.5,
        };

        this.playerCountFactors = {
            2: 1,
            3: 1.2,
            4: 1.5,
        };

        this.playerOutCome = {
            1: 1,
            2: 0.5,
            3: 0.25,
            4: 0,
        };
    }

    private expectedScore(player1: PlayerElo, player2: PlayerElo) {
        return 1 / (1 + Math.pow(this.eloPower, (player2.elo - player1.elo) / this.eloDivisor));
    }

    public calculateElo(gameMode: 'casual' | 'ranked', playerCount: 2 | 3 | 4, playerResults: HashMap<string, PlayerEloResult>): HashMap<string, number> {
        const newPlayerElo = new HashMap<string, number>();
        const gameModeFactor = this.gameModeFactors[gameMode];
        const playerCountFactor = this.playerCountFactors[playerCount];

        for (const [playerId, playerResult] of playerResults) {
            let newElo = playerResult.player.elo;
            for (const [otherPlayerId, otherPlayerResult] of playerResults) {
                if (playerId !== otherPlayerId) {
                    const expectedScore = this.expectedScore(playerResult.player, otherPlayerResult.player);
                    const actualScore = this.playerOutCome[playerResult.outcome];
                    const eloChange = this.K * gameModeFactor * playerCountFactor * (actualScore - expectedScore);
                    newElo += eloChange;
                }
            }
            newPlayerElo.set(playerId, newElo);
        }
        return newPlayerElo;
    }
}
