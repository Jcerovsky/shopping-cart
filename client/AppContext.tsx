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
  const [showList, setShowList] = useState<boolean>(false);
  const [item, setItem] = useState<string>("");
  const [isAddItemBtnClicked, setIsAddItemBtnClicked] =
    useState<boolean>(false);
  const [editingList, setEditingList] = useState<boolean>(false);
  const [editedListName, setEditedListName] = useState("");
  const [originalListName, setOriginalListName] = useState("");

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
        showList,
        setShowList,
        item,
        setItem,
        editingList,
        setEditingList,
        isAddItemBtnClicked,
        setIsAddItemBtnClicked,
        editedListName,
        setEditedListName,
        originalListName,
        setOriginalListName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
