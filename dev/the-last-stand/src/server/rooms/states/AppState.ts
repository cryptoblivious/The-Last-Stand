//  Nom du fichier : AppState.ts
//  Contexte : Un fichier de type TypeScript qui permet de stocker les usagers connectés dans l'application
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge

import { Schema, type, MapSchema } from '@colyseus/schema';
import { CUserMapper } from '../../../typescript/classes/CUserMapper';

export class AppState extends Schema {
  @type({ map: CUserMapper }) users: MapSchema<CUserMapper> = new MapSchema<CUserMapper>();
}
