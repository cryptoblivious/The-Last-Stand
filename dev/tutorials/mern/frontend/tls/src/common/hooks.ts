import { useState, useCallback } from 'react'

import { PageName } from '../common/enums';

export const useComponentChange = (pageName: PageName): [PageName, (pageName: PageName) => void] => {
  const [activePage, setActivePage] = useState<PageName>(pageName);

  const handlePageChange = useCallback((pageName: PageName) => {
    setActivePage(pageName);
  }, []);

  return [activePage, handlePageChange];
};