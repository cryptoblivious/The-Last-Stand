import React from 'react';

export interface IButtonProps {
  onClick?: () => void;
  className?: string;
  classNameAdditions?: string;
  text?: string;
  icon?: React.ReactNode | Element;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
} //ref : ChatGPT
