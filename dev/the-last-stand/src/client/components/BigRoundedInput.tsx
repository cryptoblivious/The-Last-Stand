//  Nom du fichier : BigRoundedInput.tsx
//  Contexte : Un composant React qui permet de créer un input avec des propriétés prédéfinies
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge

type BigRoundedInputProps = React.InputHTMLAttributes<HTMLInputElement>; //ref : ChatGPT

type TBigRoundedInputProps = BigRoundedInputProps & {
  color?: string;
  hSize?: string;
};

const BigRoundedInput: React.FC<TBigRoundedInputProps> = (props: TBigRoundedInputProps) => {
  const { hSize, color = 'purple-900' } = props;

  return (
    <input
      className={`bg-gray-200 rounded-xl p-3 placeholder-opacity-50 text-${color} placeholder-${color} ${hSize}`}
      {...props}
    />
  );
};

export default BigRoundedInput;
