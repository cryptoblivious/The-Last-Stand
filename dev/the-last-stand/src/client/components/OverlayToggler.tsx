interface IToggleOverlayProps {
  onClick: () => void;
}

const OverlayToggler = ({ onClick }: IToggleOverlayProps) => {
  const toggleOverlay = onClick;
  return (
    <button
      className='z-50 bg-pink-600 text-pink-600 border-purple-900 border-4 rounded-full p-4 h-12 w-12 fixed -top-3 -right-3'
      onClick={toggleOverlay}></button>
  );
};

export default OverlayToggler;
