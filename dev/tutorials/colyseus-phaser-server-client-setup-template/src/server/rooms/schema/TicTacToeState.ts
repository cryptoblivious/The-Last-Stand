import { Schema, type } from '@colyseus/schema';

export class TicTacToeState extends Schema {

    //state setup for tic tac toe game 
    @type('string')
    name = "TicTacToeState";

}