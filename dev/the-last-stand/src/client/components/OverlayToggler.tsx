interface IToggleOverlayProps {
  onClick: () => void;
}

const OverlayToggler = ({ onClick }: IToggleOverlayProps) => {
  const toggleOverlay = onClick;
  return (
    <button
      className='bg-pink-600 text-pink-600 border-purple-900 border-4 rounded-full p-4 fixed h-6 w-6 -top-3 -right-3'
      onClick={toggleOverlay}></button>
  );
};

export default OverlayToggler;
