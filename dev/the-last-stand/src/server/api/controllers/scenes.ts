import { SceneModel} from "../models/scenes";

export const getScenesNames = async (req: any, res: any) => {
    try {
        const scenes = await SceneModel.find({}, { name: 1 });
        res.status(200).json(scenes);
    } catch (err: any) {
        res.status(err.status || 500).json({ err: err.message || 'Unknown error' });
    }
};