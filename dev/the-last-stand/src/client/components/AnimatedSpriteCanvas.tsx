//  Nom du fichier : AnimatedSpriteCanvas.tsx
//  Contexte : Composant fonctionnel React servant à afficher un sprite animé sur un canvas. 
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://react.dev/

import { useEffect, useRef, useState } from "react";
import spriteSheetsLoader from '../match/scenes/spritesheetsLoader';
import { IHeroesSpritePaths } from '../../typescript/interfaces/IHeroesSpritesPaths';

interface IAnimatedSpriteCanvasProps {
    characterName: string;
    delay : number;
}

const AnimatedSpriteCanvas = (props : IAnimatedSpriteCanvasProps) => {
    const { characterName, delay} = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [spriteSheets, setSpriteSheets] = useState<IHeroesSpritePaths>();
    const [animationIndex, setAnimationIndex] = useState<number>(0);

    const getSpriteSheets = (characterName: string) => {
        characterName = characterName.toLowerCase();
        const foundSpriteSheets = spriteSheetsLoader.find((spriteSheet) => spriteSheet.heroName === characterName);
        return foundSpriteSheets ? foundSpriteSheets : null;
    }

    useEffect(() => {
        const spriteSheets = getSpriteSheets(characterName);
        if (spriteSheets) {
            setSpriteSheets(spriteSheets);
            console.log('spriteSheets', spriteSheets);
        }
    }, [characterName])

    useEffect(() => {
        if(!spriteSheets) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const parentContainer = canvas.parentElement;
            if (parentContainer) {
                canvas.width = parentContainer.clientWidth;
                canvas.height = parentContainer.clientHeight;
            }

            const context = canvas.getContext('2d');
            let frameIndex = 0;
            let tickCount = 0;
            let ticksPerFrame = 0;
            let image = new Image();
            image.src = spriteSheets.spriteSheets[animationIndex].path;
            
            const frameWidth = spriteSheets.spriteSheets[animationIndex].frameWidth;
            const frameHeight = spriteSheets.spriteSheets[animationIndex].frameHeight;
            const frameCount = spriteSheets.spriteSheets[animationIndex].endFrame;


            if (context) {
                const scale = 4;
                // context.scale(2,2)
                const render = () => {
                    tickCount += 1;
                    if (tickCount > ticksPerFrame) {
                        tickCount = 0;
                        if (frameIndex < frameCount) {
                            frameIndex += 1;
                        } else {
                            frameIndex = 0;
                        }
                    }
                    
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    const scaledFrameWidth = frameWidth * scale;
                    const scaledFrameHeight = frameHeight * scale;

                    const x = (canvas.width - scaledFrameWidth)/ 2;
                    const y = (canvas.height - scaledFrameHeight) / 2 ;


                    context.drawImage(
                        image,
                        frameIndex * frameWidth,
                        0,
                        frameWidth,
                        frameHeight,
                        x,
                        y,
                        scaledFrameWidth,
                        scaledFrameHeight
                    );
                }

                const loop = () => {
                    animationID = window.requestAnimationFrame(loop);
                    render();
                }

                image.onload = () => {
                    ticksPerFrame = 10;
                    loop();
                }
                let animationID:number;
                return () => window.cancelAnimationFrame(animationID);
            }
        }
    }, [spriteSheets, canvasRef, animationIndex])


    useEffect(() => {
        if(!spriteSheets) return;
        const interval = setInterval(() => {
            setAnimationIndex((prev) => {
                if (prev < spriteSheets.spriteSheets.length - 1) {
                    return prev + 1;
                } else {
                    return 0;
                }
            })
        }, delay);

        return () => clearInterval(interval);

    }, [spriteSheets, delay])
    
        

    return (
        <canvas ref={canvasRef} width="100%" height={`100%`}/>
    )
}

export default AnimatedSpriteCanvas;