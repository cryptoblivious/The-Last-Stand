import { Schema, type } from '@colyseus/schema';

export class IMessageMapper extends Schema {
  @type('string') username?: string = '';
  @type('string') userNo?: string = '';
  @type('string') content?: string = '';
  @type('string') date?: string = '';
  @type('string') time?: string = '';
}
