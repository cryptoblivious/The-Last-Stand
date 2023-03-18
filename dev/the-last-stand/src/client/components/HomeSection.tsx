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
      className={backgroundImg ? 'bg-no-repeat bg-cover bg-scale-150' + className : className}
      style={backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <h1>{title}</h1>
      {isHovered && <p>{subtitle}</p>}
      <Link to={link}>
        <Button
          className='w-16 bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'
          text='Go'
        />
      </Link>
    </div>
  );
};

export default HomeSection;
