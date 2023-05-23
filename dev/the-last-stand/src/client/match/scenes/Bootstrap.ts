//  Nom du fichier : Bootstrap.ts
//  Contexte : Classe héritant de Phaser.Scene qui agit comme un point d'entrée pour le jeu et qui lance les autres scènes
//  Nom des auteurs : Jonathan Robinson-Roberge et Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://phaser.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 

import Phaser from 'phaser';
import { Client } from 'colyseus.js';
import { HOST_NAME, HOST_PORT, WS_PROTOCOL } from '../../appConfig';

//holds logic for switching between scenes

export default class Bootstrap extends Phaser.Scene {
  private client?: Client;
  private user?: any;

  constructor(client?: Client, user?: {username: string, userNo: string}) {
    super('bootstrap');
    this.client = client;
    this.user = user;
  }

  init() {
    if (!this.client) {
      this.client = new Client(`${WS_PROTOCOL}://${HOST_NAME}:${HOST_PORT}`);
    }
  }

  create() {
    // console.log('client', this.client);
    //launch game scene from here and pass server instance to it
    this.scene.launch('canvas', {
      client: this.client,
      user: this.user,
    });
    this.scene.launch('hud');
  }
}
