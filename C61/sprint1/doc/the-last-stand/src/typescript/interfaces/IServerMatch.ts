import { MapSchema, ArraySchema } from '@colyseus/schema';
import GameEntity from '../../server/game/GameEntity';

export interface IServerMatch {
    entities: MapSchema<GameEntity>;
}