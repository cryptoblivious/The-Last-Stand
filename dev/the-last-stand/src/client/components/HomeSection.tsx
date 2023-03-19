import IHomeSectionProps from '../../typescript/interfaces/IHomeSectionProps';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';

const HomeSection = (props: IHomeSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { title, subtitle, link, className, backgroundImg } = props;
  return (
    <div
      className={`${className ?? 'gap-10 h-full rounded-3xl flex flex-col flex-grow items-center justify-center border-transparent hover:border-purple-900 hover:scale-105 transition ease-in-out duration-1000 border-4 transform'}${backgroundImg && 'bg-no-repeat bg-cover'}`}
      style={backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <h1>{title}</h1>
      <div className={`${isHovered ? 'h-10' : 'h-0'} transition-all duration-300 ease-out`}>
        <p className={`${isHovered ? 'opacity-100' : 'opacity-0'} overflow-y-hidden transition-all ease-in duration-500`}>{subtitle}</p>
      </div>
      <Link to={link}>
        <Button
          className='w-16 bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-1000 hover:scale-110'
          text='Go'
        />
      </Link>
    </div>
  );
};

export default HomeSection;
