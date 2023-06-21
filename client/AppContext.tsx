import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  AppContextProps,
  ShoppingCart,
  ShoppingItems,
} from "./ShoppingCartProps";

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function useAnyState() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<string>("");
  const [allLists, setAllLists] = useState<ShoppingCart[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [allItems, setAllItems] = useState<ShoppingItems[]>([]);
  const [item, setItem] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        allLists,
        setAllLists,
        isDisabled,
        setIsDisabled,
        allItems,
        setAllItems,
        item,
        setItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
