import { ECell } from '../enumerations/ECell';

export interface IMatchState {
  board: ECell[];
  activePlayer: number;
}

export default IMatchState;
