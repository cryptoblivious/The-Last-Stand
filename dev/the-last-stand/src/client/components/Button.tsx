//  Nom du fichier : Button.tsx
//  Contexte : Un composant React qui permet de créer un bouton générique qui peut être utilisé dans plusieurs contextes.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge

import { IButtonProps } from '../../typescript/interfaces/IButtonProps';

function Button(props: IButtonProps) {
  const { onClick = () => console.log('clicked!'), className = `w-fit bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110`, classNameAdditions, text, icon, disabled = false, type = 'button' } = props;

  return (
    <button
      className={`${className} ${classNameAdditions ?? ''}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onClick();
        }
      }}
      disabled={disabled}
      type={type}>
      <>
        {icon ?? null}
        {text}
      </>
    </button>
  );
}

export default Button;
