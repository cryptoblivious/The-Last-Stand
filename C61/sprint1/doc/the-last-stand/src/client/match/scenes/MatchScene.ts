import Phaser from 'phaser';
import type Server from '../../services/Server';
import IMatchState from '../../../typescript/interfaces/IMatchState';
import { ECell } from '../../../typescript/enumerations/ECell';

export default class MatchScene extends Phaser.Scene {
  private server?: Server;
  private cells: { display: Phaser.GameObjects.Rectangle; value: ECell }[] = [];

  constructor() {
    super('game');
  }

  init() {}

  preload() {}

  async create(data: { server: Server }) {
    //game recieves server instance from bootstrap scene
    const { server } = data;

    this.server = server;

    if (!this.server) {
      throw new Error('server not found');
    }

    await this.server.join();

    //once state changes, re create the board
    this.server.onceStateChanged((state) => {
      this.createBoard(state);
    });
  }

  update() {}

  // create board using match state data
  private createBoard(state: IMatchState) {
    const { width, height } = this.scale;
    const cellSize = 128;

    let x = width * 0.5 - cellSize;
    let y = height * 0.5 - cellSize;

    // iterate in the board array and create a rectangle for each cell
    state.board.forEach((cellState, index) => {
      const cell = this.add
        .rectangle(x, y, cellSize, cellSize, 0xffffff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.server?.makeSelection(index);
          // console.log('cell clicked', index)
        });

      this.cells.push({
        display: cell,
        value: cellState,
      });

      x += cellSize + 5;

      if (index % 3 === 2) {
        x = width * 0.5 - cellSize;
        y += cellSize + 5;
      }
    });

    this.server?.onBoardChange((board) => {
      this.handleBoardChange(board);
    });
  }

  private handleBoardChange(board: number[]) {
    board.forEach((cellState, index) => {
      const cell = this.cells[index];

      if (cell.value !== cellState) {
        this.add.star(cell.display.x, cell.display.y, 5, 10, 5, 0x000000);
      }
    });
  }
}
