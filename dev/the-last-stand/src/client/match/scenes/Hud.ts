import Phaser from 'phaser';

export default class Hud extends Phaser.Scene {

   private playerNumber: number = 0;

    constructor() {
        super('hud');
    }

    async create() {
        // HUD Position
        const hudYpos = this.sys.canvas.height * 0.85;
        const hudXpos1 = this.sys.canvas.width * 0.20;
        const hudXpos2 = this.sys.canvas.width * 0.40;
        const hudXpos3 = this.sys.canvas.width * 0.60;
        const hudXpos4 = this.sys.canvas.width * 0.80;

        const hudPositionhandler : Record <number,number> = {
            1: hudXpos1,
            2: hudXpos2,
            3: hudXpos3,
            4: hudXpos4
        }

        const hudElementYpos = hudYpos +10;
        const bgRadius = 10;

        
        const clientMatch = this.scene.get('canvas');
        clientMatch.events.on("hudNewPlayer", (data : {playerName : string, playerIndex : number}) => {
            // console.log("hudNewPlayer", data);
            const {playerName, playerIndex} = data;
            const hudXpos = hudPositionhandler[playerIndex];
            console.log("hudXpos", hudXpos);
            this.createNewPlayer( playerName, hudPositionhandler[playerIndex], hudElementYpos, bgRadius, hudYpos);

        });

        


        // // Player Names
        // let player1Name = 'Player 1';
        // let player2Name = 'Player 2';
        // let player3Name = 'Player 3';
        // let player4Name = 'Player 4';

        // // Player Percentage
        // let player1Percentage = 0;
        // let player2Percentage = 25;
        // let player3Percentage = 98;
        // let player4Percentage = 230;
        
        // // Player Names Labels
        // const playerNameText1 = this.add.text(hudXpos1, hudElementYpos , player1Name, { font: '16px Courier', color: '#00ff00' });
        // const playerNameText2 = this.add.text(hudXpos2, hudElementYpos , player2Name, { font: '16px Courier', color: '#00ff00' });
        // const playerNameText3 = this.add.text(hudXpos3, hudElementYpos , player3Name, { font: '16px Courier', color: '#00ff00' });
        // const playerNameText4 = this.add.text(hudXpos4, hudElementYpos , player4Name, { font: '16px Courier', color: '#00ff00' });

        // // Percentage Labels
        // const percentageText1 = this.add.text(hudXpos1, hudElementYpos + 20, `${player1Percentage}%` , { font: '32px Courier', color: '#00ff00' });
        // const percentageText2 = this.add.text(hudXpos2, hudElementYpos + 20, `${player2Percentage}%` , { font: '32px Courier', color: '#00ff00' });
        // const percentageText3 = this.add.text(hudXpos3, hudElementYpos + 20, `${player3Percentage}%`, { font: '32px Courier', color: '#00ff00' });
        // const percentageText4 = this.add.text(hudXpos4, hudElementYpos + 20, `${player4Percentage}%`, { font: '32px Courier', color: '#00ff00' });
    
        // // PlayerNames Position
        // const boundsPlayerNameText1 = playerNameText1.getBounds();
        // const boundsPlayerNameText2 = playerNameText2.getBounds();
        // const boundsPlayerNameText3 = playerNameText3.getBounds();
        // const boundsPlayerNameText4 = playerNameText4.getBounds();

        // // Percentage Position
        // const boundsPercentageText1 = percentageText1.getBounds();
        // const boundsPercentageText2 = percentageText2.getBounds();
        // const boundsPercentageText3 = percentageText3.getBounds();
        // const boundsPercentageText4 = percentageText4.getBounds();

        // // Set PlayerNames Position
        // playerNameText1.setPosition(hudXpos1 - boundsPlayerNameText1.width / 2, hudElementYpos);
        // playerNameText2.setPosition(hudXpos2 - boundsPlayerNameText2.width / 2, hudElementYpos);
        // playerNameText3.setPosition(hudXpos3 - boundsPlayerNameText3.width / 2, hudElementYpos);
        // playerNameText4.setPosition(hudXpos4 - boundsPlayerNameText4.width / 2, hudElementYpos);
       
        // // Set Percentage Position
        // percentageText1.setPosition(hudXpos1 - boundsPercentageText1.width / 2, hudElementYpos + 20);
        // percentageText2.setPosition(hudXpos2 - boundsPercentageText2.width / 2, hudElementYpos + 20);
        // percentageText3.setPosition(hudXpos3 - boundsPercentageText3.width / 2, hudElementYpos + 20);
        // percentageText4.setPosition(hudXpos4 - boundsPercentageText4.width / 2, hudElementYpos + 20);

        // // add a background to each player hud 
        // const hudPlayer1 = this.add.graphics();
        // hudPlayer1.fillStyle( 0x000000, 0.5  );
        // // create a rounder rect
        // hudPlayer1.fillRoundedRect(hudXpos1 - 50, hudYpos, 100, 75, bgRadius );

        // const hudPlayer2 = this.add.graphics();
        // hudPlayer2.fillStyle( 0x000000, 0.5  );
        // hudPlayer2.fillRoundedRect(hudXpos2 - 50, hudYpos, 100, 75, bgRadius);

        // const hudPlayer3 = this.add.graphics();
        // hudPlayer3.fillStyle( 0x000000, 0.5  );
        // hudPlayer3.fillRoundedRect(hudXpos3 - 50, hudYpos, 100, 75, bgRadius);

        // const hudPlayer4 = this.add.graphics();
        // hudPlayer4.fillStyle( 0x000000, 0.5  );
        // hudPlayer4.fillRoundedRect(hudXpos4 - 50, hudYpos, 100, 75, bgRadius);

        // // Set the texts and % to be always on top
        // playerNameText1.setDepth(1);
        // playerNameText2.setDepth(1);
        // playerNameText3.setDepth(1);
        // playerNameText4.setDepth(1);
        // percentageText1.setDepth(1);
        // percentageText2.setDepth(1);
        // percentageText3.setDepth(1);
        // percentageText4.setDepth(1);
    }

    createNewPlayer(playerName:string, hudXpos: number, hudElementYpos: number, bgRadius: number, hudYpos: number) {
        const playerNameText = this.add.text(hudXpos, hudElementYpos , playerName, { font: '16px Courier', color: '#00ff00' });
        const boundsPlayerNameText = playerNameText.getBounds();
        playerNameText.setPosition(hudXpos - boundsPlayerNameText.width / 2, hudElementYpos);
        const hudPlayer = this.add.graphics();
        hudPlayer.fillStyle( 0x000000, 0.5  );
        hudPlayer.fillRoundedRect(hudXpos - 50, hudYpos, 100, 75, bgRadius );
        playerNameText.setDepth(1);
        console.log(playerNameText);
    }
}