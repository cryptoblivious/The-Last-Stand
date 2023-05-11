import { useState } from 'react';
import Button from './Button';
import { GiFeather, GiBookmarklet } from 'react-icons/gi';

interface IToggleOverlayProps {
  onClick: () => void;
}

const OverlayToggler = ({ onClick }: IToggleOverlayProps) => {
  const toggleOverlay = onClick;
  const [active, setActive] = useState<boolean>(false);
  const icon = active ? 'GiBookmarklet' : 'GiFeather';

  const toggleActive = () => {
    setActive((prev) => !prev);
    toggleOverlay();
  };

  return (
    <Button
      className='z-50 bg-pink-600 text-white border-purple-900 border-4 rounded-full h-14 w-14 fixed transition duration-500 flex justify-center items-center hover:scale-150 right-0 top-0'
      onClick={toggleActive}
      icon={
        icon === 'GiFeather' ? (
          <GiFeather
            aria-label='GiFeather'
            fontSize='1.69rem'
            color='rgb(103 232 249)'
          />
        ) : (
          <GiBookmarklet
            aria-label='GiBookmarklet'
            fontSize='1.69rem'
            color='rgb(103 232 249)'
          />
        )
      }
    />
  );
};

export default OverlayToggler;
