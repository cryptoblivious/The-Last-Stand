const MessageList = (props: any) => {
  const { ref, messages, user } = props;
  console.log(messages);
  return (
    <div
      ref={ref}
      className='overflow-y-scroll scrollbar-custom p-4 pt-0 flex flex-col gap-3 grow'>
      {messages &&
        messages.map((message: any, index: any) => {
          const date = new Date(message.updatedAt);

          // Convert the date to the local timezone of the client and format it
          const localTimestamp = date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'medium' });

          return (
            <div
              key={index}
              className={`${user!.username === message.username && user!.userNo === message.userNo ? 'ml-auto' : ''} ${message.username == 'Server' ? 'border-neon-green bg-green-950' : 'bg-slate-900 border-cyan-500'} w-fit p-4 rounded-3xl border-2 max-w-[75%]`}>
              <p className={`italic text-green-500 ${message.username === 'Server' && 'text-sm'}`}>{localTimestamp}</p>
              {message.username === 'Server' ? (
                <p className='text-xs'>
                  <span className='text-pink-600'>{!message.content.includes('messages have been reset') ? message.content.split('#')[0] : ''}</span>
                  <span className='text-pink-900'>{!message.content.includes('messages have been reset') ? `#${message.userNo}` : ''} </span>
                  <span className='text-cyan-300'>{!message.content.includes('messages have been reset') ? message.content.substring(message.content.indexOf(' ') + 1) : message.content}</span>
                </p>
              ) : (
                <div>
                  <p>
                    <span className='text-pink-600'>{message.username}</span>
                    <span className='text-pink-900'>#{message.userNo}</span>
                  </p>
                  <div>
                    {message.content!.split('\n').map((line: any, index: any) => (
                      <p
                        className={`whitespace-normal break-all ${user!.username === message.username && user!.userNo === message.userNo ? 'text-pink-300' : 'text-white'}`}
                        key={index}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default MessageList;
