import React, { createContext, ReactNode, useState } from "react";
import {
  AppContextProps,
  ShoppingCart,
  ShoppingItems,
} from "./ShoppingCartProps";

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [list, setList] = React.useState<string>("");
  const [allLists, setAllLists] = useState<ShoppingCart[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
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
        item,
        setItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
