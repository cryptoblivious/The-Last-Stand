import { useState } from 'react'

import { close, logo, menu } from '../assets'

import { navLinks } from '../common/constant'

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
    { isOpen && (
      <main>
        LoginPage
      </main>
  )}
  </div>
  );
}

export default LoginPage