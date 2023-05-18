import { Schema, type } from '@colyseus/schema';
export default class CGameEntity extends Schema {
  @type('number') id: number;
  @type('string') name: string;
  @type({ map: 'number' }) position: { x: number; y: number };
  @type({ map: 'number' }) size: { width: number; height: number };
  damagePercentage: number;

  constructor({ id, name, position, size }: { id: number; name: string; position: { x: number; y: number }; size: { width: number; height: number }; components?: Map<string, GameComponent> }) {
    super();
    this.id = id;
    this.name = name;
    this.position = position;
    this.size = size;
    this.damagePercentage = 0;
  }
}
