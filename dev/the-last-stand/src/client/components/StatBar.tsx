
const sb_ContainerStyle = ' w-full bg-gray-300 rounded flex '

interface IStatBarProps {
    stat: string;
    value: number;
    max: number;
}


const StatBar = (props: IStatBarProps) => {
    const { stat, value, max } = props;
    const barWidth = (value / max) * 100;

    // change the color from green to red as the bar gets lower
    const color = `rgb(${255 - (barWidth * 2.55)}, ${barWidth * 2.55}, 0)`;

    return (
        <div className={sb_ContainerStyle}>
            <h1> {stat} </h1>
            <div style={{width : `${barWidth}`}} className={`h-4 bg-[${color}] rounded`}></div>
        </div>
    );

}

export default StatBar;