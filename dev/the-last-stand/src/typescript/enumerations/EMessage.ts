//  Nom du fichier : EMessage.ts
//  Contexte : Un fichier de type TypeScript qui définit une énumération pour les messages échangés entre le serveur et le client.
//  Nom des auteurs : Jonathan Robinson-Roberge et Andrzej Wisniowski
//  Références : https://chat.openai.com/

export enum EMessage {
  AssignPlayerID,
  AddOpponentID,
  CreateHitbox,
  PlayerHurt,
  ServerUpdateHudDamage,
  CreateEntity,
  RemoveEntity,
  CreateHud,
  NewHudPlayer,
  UpdateHudDamage,
  ServerRemoveHudPlayer,
  RemoveHudPlayer,
  UpdateSprite,
  RemoveAttackHitbox,
  PlayerDead,
  ExplosionDone,
  RespawnPlayer,
  UpdateHudLives,
  MatchMakerFull,
  JoinQueue,
  JoinGame,
  StartGame,
  LeaveGame,
  ToggleConversation,
  ConversationsChange,
  UsersChange,
  RemoveHitbox,
}
