import React, { useState } from "react";

interface ShoppingCart {
  name: string;
  id: number;
}

interface ShoppingItems {
  id: number;
  isDone: number;
  text: string;
  listId: number;
}

interface InitialStateProps {
  item: string;
  allItems: ShoppingItems[];
  isAddItemBtnClicked: boolean;
  showList: boolean;
  editingList: boolean;
  editedListName: string;
  originalListName: string;
}

interface IndividualItemProps {
  initialState: InitialStateProps;
  handleDeleteItem: (itemId: number) => Promise<void>;
  listId: number;
  item: ShoppingItems;
  setState: React.Dispatch<React.SetStateAction<InitialStateProps>>;
}

interface AppContextProps {
  list: string,
  allLists: ShoppingCart[]
  isDisabled: boolean
  allItems: ShoppingItems[],
  setList: React.Dispatch<React.SetStateAction<string>>,
  setAllLists: React.Dispatch<React.SetStateAction<ShoppingCart[]>>,
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setAllItems: React.Dispatch<React.SetStateAction<ShoppingItems[]>>
}

export { ShoppingItems, ShoppingCart, InitialStateProps, IndividualItemProps, AppContextProps };
