import { useState } from 'react';

interface IToggleOverlayProps {
  onClick: () => void;
}

const OverlayToggler = ({ onClick }: IToggleOverlayProps) => {
  const toggleOverlay = onClick;
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = () => {
    setActive((prev) => !prev);
    toggleOverlay();
  };

  return (
    <button
      className='z-50 bg-pink-600 text-white border-purple-900 border-4 rounded-full pr-2 pt-2 h-12 w-12 fixed transition duration-500 hover:scale-150 -top-3 -right-3'
      onClick={toggleActive}>{`${active ? 'X' : 'O'}`}</button>
  );
};

export default OverlayToggler;
