import Phaser from 'phaser';
import INewhudplayer from '../../../typescript/interfaces/INewHudPlayer';
import IUpdatePercentagesMessage from '../../../typescript/interfaces/IUpdatePercentagesMessage';

export default class Hud extends Phaser.Scene {

    private playerList: string[] = [];
    private playerContainers: Record<string, Phaser.GameObjects.Container> = {};

    constructor() {
        super('hud');
    }

    async create() {
        // HUD Position
        const hudYpos = this.sys.canvas.height * 0.85;
        const getHudXPosition = (index:number) => {
            return this.sys.canvas.width * (0.20 + (index * 0.20));
        }

        const hudElementYpos = hudYpos + 10;
        const bgRadius = 10;

        const clientMatch = this.scene.get('canvas');
        clientMatch.events.on("new_hud_player", (data: INewhudplayer) => {
            const { name: playerName, index: playerIndex, damagePercentage: playerDamage } = data;
            if (this.playerList.includes(playerName)) {
                return;
            }
            this.playerList.push(playerName);
            this.createNewPlayer(playerName, getHudXPosition(playerIndex) , hudElementYpos, bgRadius, hudYpos, playerDamage);
        });

        clientMatch.events.on("update_hud_damage", (data: IUpdatePercentagesMessage) => {
            
            const elementNames = {
                player: `nameText-${data.playerNameOrID}`,
                hud: `hudPlayer-${data.playerNameOrID}`,
                percentage: `percentageText-${data.playerNameOrID}`,
                container: `hudContainer-${data.playerNameOrID}`
            }

            const playerContainer = this.playerContainers[elementNames.container];
            const playerNameText = playerContainer.getByName(elementNames.player) as Phaser.GameObjects.Text;
            const playerPercentageText = playerContainer.getByName(elementNames.percentage) as Phaser.GameObjects.Text;

            if (!playerContainer || !playerNameText || !playerPercentageText) {
                return;
            } 
            
            const formerPercentageTextWidth = playerPercentageText.width;

            playerPercentageText.setText(`${data.damagePercentage}%`);

            const newPercentageTextWidth = playerPercentageText.width;
            const percentageTextXPos = playerPercentageText.x + (formerPercentageTextWidth - newPercentageTextWidth) / 2;
    
            playerPercentageText.setPosition(percentageTextXPos, playerPercentageText.y);
        });

        clientMatch.events.on("remove_hud_player", (data:{playerNameOrID:string}) => {
            const containerName = `hudContainer-${data.playerNameOrID}`;
            const container = this.playerContainers[containerName];
            if (!container) {
                return;
            }
            container.destroy();
        });

    }
    

    createNewPlayer(playerName: string, hudXpos: number, hudElementYpos: number, bgRadius: number, hudYpos: number, playerDamage: number) {
        
        const elementNames = {
            player: `nameText-${playerName}`,
            hud: `hudPlayer-${playerName}`,
            percentage: `percentageText-${playerName}`,
            container: `hudContainer-${playerName}`
        }

        const playerNameText = this.add.text(hudXpos, hudElementYpos, playerName, { font: '16px Courier', color: '#00ff00' });
        const bounds = playerNameText.getBounds();
        playerNameText.setPosition(hudXpos - bounds.width / 2, hudElementYpos);
        playerNameText.name = elementNames.player;

        const hudPlayer = this.add.graphics();

        const percentageText = this.add.text(hudXpos, hudElementYpos + 20, `${playerDamage}%`, { font: '32px Courier', color: '#00ff00' });
        percentageText.name = elementNames.percentage;
        
        const boundsPercentageText = percentageText.getBounds();
        percentageText.setPosition(hudXpos - boundsPercentageText.width / 2, hudElementYpos + 20);

        const hudContainer = this.add.container();
        hudContainer.add([playerNameText, hudPlayer, percentageText]);
        hudContainer.setDepth(1);
        hudContainer.name = elementNames.container;
        hudContainer.width = Math.max(bounds.width, boundsPercentageText.width) + 20;
        hudContainer.height = bounds.height + boundsPercentageText.height + 20;

        hudPlayer.fillStyle(0x000000, 0.5);
        hudPlayer.fillRoundedRect(hudXpos - hudContainer.width / 2, hudYpos, hudContainer.width, hudContainer.height, bgRadius);
        hudPlayer.name = elementNames.hud;

        this.playerContainers[elementNames.container] = hudContainer;

    }
}