//  Nom du fichier : Hud.ts
//  Contexte : Classe héritant de Phaser.Scene pour la gestion du hud du jeu
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://phaser.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 


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
            console.log('player added to hud' + data)
            console.log('playerList' + this.playerList)
            const player : INewhudplayer = data;
            
            if (this.playerList.includes(player.id)) {
                return;
            }
        
            this.playerList.push(player.id);
            this.createNewPlayer(player.id, player.name, getHudXPosition(player.index) , hudElementYpos, bgRadius, hudYpos, player.damagePercentage!, player.lives!,  bgPadding);
        });

        // TODO -> Break down the signals logic into functions and use binds and callbacks
        clientMatch.events.on(EMessage.UpdateHudDamage.toString(), (data: IUpdatePercentagesMessage) => {
            
            const elementNames = { 
                player: `nameText-${data.containerKey}`,
                hud: `hudBackground-${data.containerKey}`,
                percentage: `percentageText-${data.containerKey}`,
                container: `hudContainer-${data.containerKey}`
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

        clientMatch.events.on(EMessage.UpdateHudLives.toString(), (data:{name:string, lives:number}) => {
            const containerName = `hudContainer-${data.name}`;
            const livesTextName = `livesText-${data.name}`;

            const container = this.playerContainers[containerName];
            if (!container) {
                return;
            }
            const livesText = container.getByName(livesTextName) as Phaser.GameObjects.Text;
            if (!livesText) {
                return;
            }
            livesText.setText(`Lives: ${data.lives}`);
        });

    }
    
    createNewPlayer(containerKey: string, name:string,  hudXpos: number, hudElementYpos: number, bgRadius: number, hudYpos: number, playerDamage: number, playerLives:number, padding:number = 20) {
        
        const elementNames = {
            player: `nameText-${containerKey}`,
            hud: `hudBackground-${containerKey}`,
            percentage: `percentageText-${containerKey}`,
            lives : `livesText-${containerKey}`,
            container: `hudContainer-${containerKey}`
        }

        // Player name in the hud
        const playerNameText = this.add.text(hudXpos, hudElementYpos, name, { font: '16px Courier', color: '#00ff00' });
        playerNameText.setPosition(hudXpos - playerNameText.width / 2, hudElementYpos);
        playerNameText.name = elementNames.player;

        // Player damage percentage in the hud
        const percentageText = this.add.text(hudXpos, hudElementYpos + padding , `${playerDamage}%`, { font: '32px Courier', color: '#00ff00' });
        percentageText.name = elementNames.percentage;
        percentageText.setPosition(hudXpos - percentageText.width / 2, hudElementYpos + playerNameText.height);

        // Player lives in the hud
        const livesText = this.add.text(hudXpos, hudElementYpos, `Lives: ${playerLives}`, { font: '16px Courier', color: '#00ff00' });
        livesText.name = elementNames.lives;
        livesText.setPosition(hudXpos - livesText.width / 2, hudElementYpos + playerNameText.height + percentageText.height);

        // Container for the hud elements
        const hudContainer = this.add.container();
        hudContainer.setDepth(1);
        hudContainer.name = elementNames.container;
        hudContainer.width = Math.max(playerNameText.width, percentageText.width, livesText.width) + padding;
        hudContainer.height = playerNameText.height + percentageText.height + livesText.height + padding;

        // Add a background to the hud
        const hudBackground = this.add.graphics();
        hudBackground.fillStyle(0x000000, 0.5);
        hudBackground.fillRoundedRect(hudXpos - hudContainer.width / 2, hudYpos, hudContainer.width, hudContainer.height, bgRadius);
        hudBackground.name = elementNames.hud;

        // Add the elements to the container and save the container
        hudContainer.add([playerNameText, hudBackground, percentageText, livesText]);
        this.playerContainers[elementNames.container] = hudContainer;

    }
}