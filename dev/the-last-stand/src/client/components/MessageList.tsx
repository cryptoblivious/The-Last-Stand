const MessageList = (messages: string[]) => {
  console.log('messages', messages);
  return (
    <div className='overflow-y-scroll scrollbar-custom p-4 pt-0 flex flex-col gap-2 grow'>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default MessageList;
