import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuth } from '../actions/isAuth';

export const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      const { status, data } = await isAuth();
      setIsAuthenticated(status);
      setIsLoading(false);
      console.log('authenticated: ', status);
      if (data.message) console.log(data.message);
    };
    fetchAuth();
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className='bg-black text-white h-screen'>Checking authentication...</div>;
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate
      to='/login'
      replace
    />
  );
};
