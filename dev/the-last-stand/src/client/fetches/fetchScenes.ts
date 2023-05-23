//  Nom du fichier : fetchScenes.ts
//  Contexte : fichier servant pour les fetches du component GameLobby
//  Nom des auteurs : Jonathan Robinson-Roberge et Andrzej Wisniowski
//  Références : https://chat.openai.com/ 


import { HOST_URL, HOST_PORT } from '../appConfig';
import { gl_GridCardData } from '../components/GameLobbyCard';

const sceneImages: Record<string, string> = {
    'Industrial Park' : '/assets/scenes/industrial_park.png',
}

export const fetchScenesNames = async (): Promise<{ scenes: gl_GridCardData[] }> => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/scenes/names`);
  const scenesNames = await response.json();
  const scenes: gl_GridCardData[] = [];
  scenesNames.forEach((scene: { _id: number; name: string }) => {
    scenes.push({
      id: scene._id,
      name: scene.name,
      image: sceneImages[scene.name],
    });
  });
  return { scenes };
}