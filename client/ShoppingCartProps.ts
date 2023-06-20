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
  setList: React.Dispatch<React.SetStateAction<string>>,
  allLists: ShoppingCart[]
  setAllLists: React.Dispatch<React.SetStateAction<ShoppingCart[]>>,
  allItems: ShoppingItems[],
  setAllItems: React.Dispatch<React.SetStateAction<ShoppingItems[]>>
  isDisabled: boolean,
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  // item: string,
  // setItem: React.Dispatch<React.SetStateAction<string>>
  // isAddItemBtnClicked: boolean,
  // setIsAddItemBtnClicked: React.Dispatch<React.SetStateAction<boolean>>,
  showList: boolean,
  setShowList: React.Dispatch<React.SetStateAction<boolean>>,
  // editingList: boolean,
  // setEditingList: React.Dispatch<React.SetStateAction<boolean>>,
}


export { ShoppingItems, ShoppingCart, InitialStateProps, IndividualItemProps, AppContextProps };
