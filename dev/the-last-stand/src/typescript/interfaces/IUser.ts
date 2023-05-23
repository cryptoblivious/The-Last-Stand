//  Nom du fichier : IUser.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les utilisateurs
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

export interface IUser {
  _id?: string;
  email?: string;
  username?: string;
  userNo?: string;
  title?: string;
  avatar?: string;
  lastOnline?: Date | string;
  activeConversationsIds?: string[];
}
