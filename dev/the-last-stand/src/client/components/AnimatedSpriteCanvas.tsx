import { useEffect, useRef } from "react";

export interface IAnimatedSpriteCanvasProps {
    src: string;
    frameCount: number;
    frameWidth: number;
    frameHeight: number;
}

const AnimatedSpriteCanvas = (props: IAnimatedSpriteCanvasProps) => {
    const { src, frameCount, frameWidth, frameHeight } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
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
            image.src = src;


            if (context) {
                context.setTransform(4,0,0,4,0,0)
                
                
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

                    const x = canvas.width / 8 - frameWidth / 4;
                    const y = canvas.height / 8 - frameHeight / 4;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(
                        image,
                        frameIndex * frameWidth,
                        0,
                        frameWidth,
                        frameHeight,
                        30,
                        5,
                        frameWidth ,
                        frameHeight
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
                return () => {
                    window.cancelAnimationFrame(animationID);
                }
            }
        }
    }, [src, frameCount, frameWidth, frameHeight])


        

    return (
        <canvas ref={canvasRef} width="100%" height={`100%`}/>
    )
}

export default AnimatedSpriteCanvas;