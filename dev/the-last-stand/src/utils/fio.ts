//  Nom du fichier : DoublyLinkedList.ts
//  Contexte : Une liste chainée doublement liée utilisée spécifiquement dans la hashmap de ce projet.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson
//  Références : https://chat.openai.com/ - 

export const extractTextData = async (filepath: string): Promise<string> => {
    const response = await fetch(filepath);
    const data = await response.text();
    return data;
  };
  