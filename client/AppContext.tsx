import React, { createContext, ReactNode, useState } from 'react';
import { AppContextProps, ShoppingCart } from './ShoppingCartProps';

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [list, setList] = React.useState<string>('');
  const [allLists, setAllLists] = useState<ShoppingCart[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

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
      }}
    >
      {errorMessage && (
        <div>
          <h1>Something went wrong</h1>
          <p onClick={() => setErrorMessage(false)}>Click to dismiss</p>
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
}
