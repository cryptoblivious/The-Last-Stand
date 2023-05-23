//  Nom du fichier : IHomeSectionProps.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les propriétés d'une section de la page d'accueil.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

export default interface IHomeSectionProps {
  className?: string;
  title: string;
  subtitle: string;
  link: string;
  backgroundImg?: string;
}
