import Button from './Button';
import { GiAbstract053, GiNinjaHead } from 'react-icons/gi';
import { IChatboxResizerProps } from '../../typescript/interfaces/IChatboxResizerProps';

const ChatboxResizeButton = (props: IChatboxResizerProps) => {
  const { onClick, chatboxOpen } = props;
  const resizeChatbox = onClick;

  return (
    <>
      {chatboxOpen ? (
        <Button
          onClick={resizeChatbox}
          classNameAdditions={`p-2 z-50`}
          icon={
            <GiNinjaHead
              aria-label='GiNinjaHead'
              fontSize='1.69rem'
              color='rgb(103 232 249)'
            />
          }
        />
      ) : (
        <Button
          onClick={resizeChatbox}
          classNameAdditions={`absolute -left-14 -top-1 p-2 z-50`}
          icon={
            <GiAbstract053
              aria-label='GiAbstract053'
              fontSize='1.69rem'
              color='rgb(103 232 249)'
            />
          }
        />
      )}
    </>
  );
};

export default ChatboxResizeButton;
