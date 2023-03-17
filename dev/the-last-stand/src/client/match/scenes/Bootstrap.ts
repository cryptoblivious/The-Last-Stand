import Phaser from 'phaser';
import { Client } from 'colyseus.js';
import { HOST_NAME, HOST_PORT } from '../../config';

//holds logic for switching between scenes

export default class Bootstrap extends Phaser.Scene {
  private client?: Client;

  constructor() {
    super('bootstrap');
  }

  init() {
    this.client = new Client(`ws://${HOST_NAME}:${HOST_PORT}`);
    //this.client = new Client('ws://localhost:9001')
  }

  create() {
    //launch game scene from here and pass server instance to it
    this.scene.launch('the-last-stand', {
      client: this.client,
    });
  }
}
