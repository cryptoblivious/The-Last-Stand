import { IButtonProps } from '../../typescript/interfaces/IButtonProps';

function Button(props: IButtonProps) {
  const { onClick = () => console.log('clicked!'), className = 'flex items-center justify-center h-12 px-6 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600', text, icon, disabled = false, type = 'button' } = props;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}>
      {icon && icon}
      {text}
    </button>
  );
}

export default Button; //ref: ChatGPT
