import { Navigate } from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
import { fetchAuth } from '../../fetches/fetchAuth';
import { IProtectedRouteProps } from '../../../typescript/interfaces/IProtectedRouteProps';

export const ProtectedRoute = ({ element: Component, userAuth = true, redirects = '/login' }: IProtectedRouteProps) => {
  const isAuthenticated = useRef<boolean>(false);
  const isLoading = useRef(true);
  const data = useRef<any>([]);

  const fetchData = async () => {
    const result = await fetchAuth();
    const { status, data: fetchedData } = result;
    isAuthenticated.current = status;
    data.current = fetchedData;
    isLoading.current = false;
  };

  useEffect(() => {
    console.log('ProtectedRoute rendered');
    //fetchData();
  }, []);

  return <div className='bg-black text-white h-screen'>Checking authentication...</div>;

  if (isLoading.current) {
    console.log('Loading data...');
    return <div className='bg-black text-white h-screen'>Checking authentication...</div>;
  }

  return isAuthenticated.current === userAuth || userAuth === 'both' ? (
    React.cloneElement(Component, { data: data.current })
  ) : (
    <Navigate
      to={redirects}
      replace
    />
  );
};
