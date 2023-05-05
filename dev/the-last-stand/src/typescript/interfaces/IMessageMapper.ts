import { Schema, type } from '@colyseus/schema';

export class IMessageMapper extends Schema {
  @type('string') userId?: string = '';
  @type('string') username?: string = '';
  @type('string') userNo?: string = '';
  @type('string') content?: string = '';
}
