//  Nom du fichier : scene.ts   
//  Contexte : Fonction servant de controleur dans la route pour aller chercher le nom des scenes dans la base de données
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski


import { SceneModel} from "../models/scenes";

export const getScenesNames = async (req: any, res: any) => {
    try {
        const scenes = await SceneModel.find({}, { name: 1 });
        res.status(200).json(scenes);
    } catch (err: any) {
        res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
    }
};