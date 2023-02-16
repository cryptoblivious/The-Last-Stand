import React, { useState, useCallback } from 'react'

export const usePageChange() {
    const [activePage, setActivePage] = useState('LoginPage');

    const handlePageChange = useCallback(() => {
      setActivePage(pageName);
    }, []);

    return [activePage, handlePageChange];
}