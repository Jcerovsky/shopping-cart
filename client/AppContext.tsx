import React, { createContext, ReactNode, useState } from 'react';
import { AppContextProps, ShoppingCart } from './ShoppingCartProps';

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [list, setList] = React.useState<string>('');
  const [allLists, setAllLists] = useState<ShoppingCart[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(1);
  const [limitPerPage, setLimitPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        allLists,
        setAllLists,
        isDisabled,
        setIsDisabled,
        setErrorMessage,
        pageCount,
        setPageCount,
        limitPerPage,
        setLimitPerPage,
        currentPage,
        setCurrentPage,
      }}
    >
      {errorMessage && (
        <div>
          <h1>Something went wrong.</h1>
          <p>There was an {errorMessage}</p>
          <p onClick={() => setErrorMessage('')}>Click to dismiss</p>
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
}
