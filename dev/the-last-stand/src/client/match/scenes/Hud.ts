import Phaser from 'phaser';
import INewhudplayer from '../../../typescript/interfaces/INewHudPlayer';
import IUpdatePercentagesMessage from '../../../typescript/interfaces/IUpdatePercentagesMessage';

export default class Hud extends Phaser.Scene {
    
    private playerList : string[] = [];

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
            0: hudXpos1,
            1: hudXpos2,
            2: hudXpos3,
            3: hudXpos4
        }
        const hudElementYpos = hudYpos +10;
        const bgRadius = 10;

        const clientMatch = this.scene.get('canvas');
        clientMatch.events.on("new_hud_player", (data : INewhudplayer) => {
            const {name: playerName, index: playerIndex, damagePercentage: playerDamage} = data;
            if (this.playerList.includes(playerName)) {
                return;
            }
            this.playerList.push(playerName);
            this.createNewPlayer( playerName, hudPositionhandler[playerIndex], hudElementYpos, bgRadius, hudYpos, playerDamage);
        });

        clientMatch.events.on("update_hud_damage", (data : IUpdatePercentagesMessage) => {
            const playerPercentageText = this.children.getByName(data.playerNameOrID) as Phaser.GameObjects.Text;
            if (playerPercentageText.name === null || playerPercentageText.name === undefined) {
                return;
            }
            playerPercentageText.setText(`${data.damagePercentage}%`);
        });

        clientMatch.events.on("remove_hud_player", (data : string) => {
            const playerPercentageText = this.children.getByName(data) as Phaser.GameObjects.Text;
            const playerNameText = this.children.getByName(data) as Phaser.GameObjects.Text;
            if (playerPercentageText.name === null || playerPercentageText.name === undefined) {
                return;
            }
            playerNameText.destroy();
            playerPercentageText.destroy();
        });

    }

    createNewPlayer(playerName:string, hudXpos1: number, hudElementYpos: number, bgRadius: number, hudYpos: number, playerDamage: number) {
        const playerNameText = this.add.text(hudXpos1, hudElementYpos , playerName, { font: '16px Courier', color: '#00ff00' });
        const boundsPlayerNameText = playerNameText.getBounds();
        playerNameText.setPosition(hudXpos1 - boundsPlayerNameText.width / 2, hudElementYpos);
        playerNameText.name = 'player' + playerName;
        const hudPlayer = this.add.graphics();
        hudPlayer.fillStyle( 0x000000, 0.5  );
        hudPlayer.fillRoundedRect(hudXpos1 - 50, hudYpos, 100, 75, bgRadius );
        playerNameText.setDepth(1);
        const percentageText = this.add.text(hudXpos1, hudElementYpos + 20, `${playerDamage}%` , { font: '32px Courier', color: '#00ff00' });
        percentageText.name = playerName;
        const boundsPercentageText = percentageText.getBounds();
        percentageText.setPosition(hudXpos1 - boundsPercentageText.width / 2, hudElementYpos + 20);
        percentageText.setDepth(1);
        console.log(percentageText);

    }
}