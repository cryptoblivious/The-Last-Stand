import { Schema, type, ArraySchema } from '@colyseus/schema';

export class MatchRoomState extends Schema  {
  //state setup for tic tac toe game
  @type('string') name: string = 'The-Last-Stand match room';

  @type(['number'])
  board: ArraySchema<number>;

  @type('number')
  activePlayer = 0;

  constructor() {
    super();
    this.board = new ArraySchema(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
