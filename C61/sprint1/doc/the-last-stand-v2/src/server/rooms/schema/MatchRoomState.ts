import { Schema, type, ArraySchema} from '@colyseus/schema';
import IMatchState from '../../../types/IMatchState';

export class MatchRoomState extends Schema implements IMatchState{

    //state setup for tic tac toe game 
    @type('string')
    name = "The-Last-Stand match room";

    @type(['number'])
    board =  ArraySchema<number>

    @type('number')
    activePlayer = 0 


    constructor() 
    {
        super();
        this.board = new ArraySchema(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        )
    }
}