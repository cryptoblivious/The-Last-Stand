import { Position } from '../../server/rooms/schema/MatchState';

export interface IGameEntityMapper {
  id: string;
  gameEntityType: string;
  position: Position;
  anim?: string | undefined;
  direction?: string;
}
