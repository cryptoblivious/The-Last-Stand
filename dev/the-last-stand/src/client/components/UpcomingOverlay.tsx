//  Nom du fichier : UpcomingOverlay.tsx
//  Contexte : Un composant React qui permet d'afficher un overlay pour les fonctionnalités à venir
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

const UpcomingOverlay = () => {
  return (
    <div className='z-30 absolute top-0 bottom-0 left-0 right-0 bg-opacity-50 flex justify-center items-center bg-black'>
      <h1 className='bg-black bg-opacity-80 rounded-full p-4 transition duration-1000 hover:scale-125 cursor-not-allowed text-white'>Coming soon!</h1>
    </div>
  );
};

export default UpcomingOverlay;
