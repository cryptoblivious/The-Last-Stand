import { IButtonProps } from '../../typescript/interfaces/IButtonProps';
import Button from './Button';
import { GiFeather, GiBookmarklet } from 'react-icons/gi';
import { useState } from 'react';

function EditButton(props: IButtonProps) {
  const { onClick = () => console.log('clicked!'), className = 'flex items-center justify-center', disabled = false, type = 'button' } = props;
  const toggleEditState = onClick;

  const [icon, setIcon] = useState<string>('GiFeather');

  const toggleIcon = () => {
    icon === 'GiFeather' ? setIcon('GiBookmarklet') : setIcon('GiFeather');
  };

  const handleEdit = () => {
    toggleEditState();
    toggleIcon();
  };

  return (
    <Button
      className={className}
      onClick={handleEdit}
      disabled={disabled}
      type={type}
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
      }></Button>
  );
}

export default EditButton;
