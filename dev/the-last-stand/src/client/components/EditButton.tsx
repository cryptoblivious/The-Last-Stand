import { IButtonProps } from '../../typescript/interfaces/IButtonProps';
import Button from './Button';
import { GiBookmark, GiBookmarklet } from 'react-icons/gi';
import {} from 'react-icons/gi';
import { useState } from 'react';

function EditButton(props: IButtonProps) {
  const { onClick = () => console.log('clicked!'), className = 'flex items-center justify-center', disabled = false, type = 'button' } = props;

  const [icon, setIcon] = useState<string>('GiBookmark');
  const toggleEditCard = onClick;

  const toggleIcon = () => {
    icon === 'GiBookmark' ? setIcon('GiBookmarklet') : setIcon('GiBookmark');
  };

  const handleEdit = () => {
    toggleEditCard();
    toggleIcon();
  };

  return (
    <Button
      className={className}
      onClick={handleEdit}
      disabled={disabled}
      type={type}
      icon={
        icon === 'GiBookmark' ? (
          <GiBookmark
            aria-label='GiBookmark'
            fontSize='1.69rem'
            color='rgb(103 232 249)'
          />
        ) : (
          <GiBookmarklet
            aria-label='GiWhiteBook'
            fontSize='1.69rem'
            color='rgb(103 232 249)'
          />
        )
      }></Button>
  );
}

export default EditButton;
