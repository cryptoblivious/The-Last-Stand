import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchAuth } from '../../fetches/fetchAuth';
import { IProtectedRouteProps } from '../../../typescript/interfaces/IProtectedRouteProps';

export const ProtectedRoute = ({ element: Component, userAuth = true, redirects = '/login' }: IProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    const result = await fetchAuth();
    const { status, data } = result;
    setIsAuthenticated(status);
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div className='bg-black text-white h-screen'>Checking authentication...</div>;
  }

  return isAuthenticated === userAuth || userAuth === 'both' ? (
    React.cloneElement(Component, { data })
  ) : (
    <Navigate
      to={redirects}
      replace
    />
  );
};
