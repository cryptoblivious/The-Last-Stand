import { IButtonProps } from '../../typescript/interfaces/IButtonProps';
import Button from './Button';
import { GiFeather } from 'react-icons/gi';

function EditButton(props: IButtonProps) {
  const { onClick = () => console.log('clicked!'), className = 'flex items-center justify-center', disabled = false, type = 'button' } = props;

  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      icon={
        <GiFeather
          aria-label='GiFeather'
          fontSize='1.69rem'
          color='rgb(103 232 249)'
        />
      }></Button>
  );
}

export default EditButton;
