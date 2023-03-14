import { IErrorPopupProps } from '../../typescript/interfaces/IErrorPopupProps';
import Button from './Button';
import { useState } from 'react';
import { GiAzulFlake } from 'react-icons/gi';

function ErrorPopup(props: IErrorPopupProps) {
  const { message, onClick } = props;
  let text = '';

  if (message === 'Server error') {
    text = 'There was an error communicating with the server. Please try again later.';
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-gray-800 text-white flex flex-col gap-4 rounded-lg border-gray-900 border-2 p-6 text-left relative'>
        <Button
          onClick={onClick}
          className={`items-center absolute -top-5 -right-2 justify-center flex transition rounded-full bg-gray-900 border-cyan-300 border-2 ease-in-out origin-center duration-500 w-12 h-12 hover:scale-110`}
          icon={
            <GiAzulFlake
              aria-label='GiPaperArrow'
              fontSize='2rem'
              color='rgb(103 232 249)'
            />
          }
        />
        <h2 className='text-xl font-bold underline'>Error</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ErrorPopup; //ref: ChatGPT
