//  Nom du fichier : IButtonProps.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les boutons
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson
//  Références : https://chat.openai.com/

import React from 'react';

export interface IButtonProps {
  onClick?: () => void;
  className?: string;
  classNameAdditions?: string;
  text?: string;
  icon?: React.ReactNode | Element;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
