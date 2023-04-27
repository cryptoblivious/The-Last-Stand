import Phaser from 'phaser';
import INewhudplayer from '../../../typescript/interfaces/INewHudPlayer';
import IUpdatePercentagesMessage from '../../../typescript/interfaces/IUpdatePercentagesMessage';
import { EMessage } from '../../../typescript/enumerations/EMessage';

export default class Hud extends Phaser.Scene {

    private playerList: string[] = [];
    private playerContainers: Record<string, Phaser.GameObjects.Container> = {};

    constructor() {
        super('hud');
    }

    async create() {
        
        const bgRadius = 10;
        const bgPadding = 20;

        // HUD Position
        const hudYpos = this.sys.canvas.height * 0.85;
        const getHudXPosition = (index:number) => {
            return this.sys.canvas.width * (0.20 + (index * 0.20));
        }
        const hudElementYpos = hudYpos + 10;
        
        // Get the main canvas scene
        const clientMatch = this.scene.get('canvas');

        // Manage the signals from the main canvas scene
        clientMatch.events.on(EMessage.NewHudPlayer.toString(), (data: INewhudplayer) => {
            const { name: playerName, index: playerIndex, damagePercentage: playerDamage } = data;
            if (this.playerList.includes(playerName)) {
                return;
            }
            this.playerList.push(playerName);
            this.createNewPlayer(playerName, getHudXPosition(playerIndex) , hudElementYpos, bgRadius, hudYpos, playerDamage, bgPadding);
        });

        // TODO -> Break down the signals logic into functions and use binds and callbacks
        clientMatch.events.on(EMessage.UpdateHudDamage.toString(), (data: IUpdatePercentagesMessage) => {
            
            const elementNames = {
                player: `nameText-${data.playerNameOrID}`,
                hud: `hudBackground-${data.playerNameOrID}`,
                percentage: `percentageText-${data.playerNameOrID}`,
                container: `hudContainer-${data.playerNameOrID}`
            }

            // Get the right player's container and its elements from the scene
            const playerContainer = this.playerContainers[elementNames.container];
            const playerNameText = playerContainer.getByName(elementNames.player) as Phaser.GameObjects.Text;
            const playerPercentageText = playerContainer.getByName(elementNames.percentage) as Phaser.GameObjects.Text;

            if (!playerContainer || !playerNameText || !playerPercentageText) {
                return;
            } 
            
            // Update the player damage percentage and reposition the text
            const formerPercentageTextWidth = playerPercentageText.width;
            playerPercentageText.setText(`${data.damagePercentage}%`);
            const newPercentageTextWidth = playerPercentageText.width;
            const percentageTextXPos = playerPercentageText.x + (formerPercentageTextWidth - newPercentageTextWidth) / 2;
            playerPercentageText.setPosition(percentageTextXPos, playerPercentageText.y);
        });

        clientMatch.events.on(EMessage.RemoveHudPlayer.toString(), (data:{playerNameOrID:string}) => {
            const containerName = `hudContainer-${data.playerNameOrID}`;
            const container = this.playerContainers[containerName];
            if (!container) {
                return;
            }
            container.destroy();
        });

    }
    
    createNewPlayer(playerName: string, hudXpos: number, hudElementYpos: number, bgRadius: number, hudYpos: number, playerDamage: number, padding = 20) {
        
        const elementNames = {
            player: `nameText-${playerName}`,
            hud: `hudBackground-${playerName}`,
            percentage: `percentageText-${playerName}`,
            container: `hudContainer-${playerName}`
        }

        // Player name in the hud
        const playerNameText = this.add.text(hudXpos, hudElementYpos, playerName, { font: '16px Courier', color: '#00ff00' });
        const playerNameTextBounds = playerNameText.getBounds();
        playerNameText.setPosition(hudXpos - playerNameTextBounds.width / 2, hudElementYpos);
        playerNameText.name = elementNames.player;

        // Player damage percentage in the hud
        const percentageText = this.add.text(hudXpos, hudElementYpos + padding , `${playerDamage}%`, { font: '32px Courier', color: '#00ff00' });
        percentageText.name = elementNames.percentage;
        const boundsPercentageText = percentageText.getBounds();
        percentageText.setPosition(hudXpos - boundsPercentageText.width / 2, hudElementYpos + padding);

        // Container for the hud elements
        const hudContainer = this.add.container();
        hudContainer.setDepth(1);
        hudContainer.name = elementNames.container;
        hudContainer.width = Math.max(playerNameTextBounds.width, boundsPercentageText.width) + padding;
        hudContainer.height = playerNameTextBounds.height + boundsPercentageText.height + padding;

        // Add a background to the hud
        const hudBackground = this.add.graphics();
        hudBackground.fillStyle(0x000000, 0.5);
        hudBackground.fillRoundedRect(hudXpos - hudContainer.width / 2, hudYpos, hudContainer.width, hudContainer.height, bgRadius);
        hudBackground.name = elementNames.hud;

        // Add the elements to the container and save the container
        hudContainer.add([playerNameText, hudBackground, percentageText]);
        this.playerContainers[elementNames.container] = hudContainer;

    }
}