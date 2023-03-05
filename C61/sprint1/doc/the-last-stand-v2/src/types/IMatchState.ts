export enum Cell 
{
    Empty,
    X,
    O
}


export interface IMatchState {


    board : Cell[];
    activePlayer : number;

}

export default IMatchState;