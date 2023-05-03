import { Grid, Card, CardActionArea, CardMedia, Typography } from '@mui/material';

export type Character = {
    id: number,
    name: string,
    image: string,
    description?: string,
}



interface IGameLobbyCharacterCardProps {
    character: Character,
    onSelect: (character: Character) => void,
}


const GameLobbyCharacterCard = ({ character, onSelect } : IGameLobbyCharacterCardProps ) => {
    const { name, image } = character;

    return (
        <Card variant='outlined'>
            <CardActionArea onClick={() => onSelect(character)}>
                <CardMedia component="img" image={image} alt={name} />
                <Typography variant="h6" align='center'>
                    {name}
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default GameLobbyCharacterCard;