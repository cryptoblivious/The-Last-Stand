import { Position } from '../../server/rooms/states/MatchState';

export interface IGameEntityMapper {
  id: string;
  gameEntityType: string;
  position: Position;
  anim?: string | undefined;
  direction?: string;
}
