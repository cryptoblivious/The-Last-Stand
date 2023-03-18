const arrowContainerCSS = 'cursor-pointer transform transition-transform duration-300 ease-in-out flex justify-center items-center'
const arrowCSS = 'text-cyan-500 stroke-current fill-none stroke-3 rounded stroke-linecap-round stroke-linejoin-round filter drop-shadow-md hover:scale-125'

// lookup table for the svg path (direction of the arrow)
const directions = {
    up: 'M6 15l6-6 6 6',
    down: 'M6 9l6 6 6-6',
    left: 'M15 18l-6-6 6-6',
    right: 'M9 18l6-6-6-6',
};

interface IArrowProps {
    direction: 'up' | 'down' | 'left' | 'right';
    onClick: () => void;
    svgWidth?: string;
    svgHeight?: string;
}

const Arrow: React.FC<IArrowProps> = ({ direction, onClick, svgHeight = '50', svgWidth = '50' }: IArrowProps) => {
    return (
        <div className={arrowContainerCSS} onClick={onClick}>
            <svg className={arrowCSS} width={svgWidth} height={svgHeight} viewBox="0 0 24 24">
                <path d={directions[direction]} fill='#00FF9C' />
            </svg>
        </div>
    )

}

export default Arrow;