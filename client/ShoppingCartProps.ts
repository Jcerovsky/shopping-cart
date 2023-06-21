import React from "react";

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

interface IndividualItemProps {
  handleDeleteItem: (itemId: number) => Promise<void>;
  listId: number;
  item: ShoppingItems;
  showList: boolean;
}

interface AppContextProps {
  list: string;
  setList: React.Dispatch<React.SetStateAction<string>>;
  allLists: ShoppingCart[];
  setAllLists: React.Dispatch<React.SetStateAction<ShoppingCart[]>>;
  allItems: ShoppingItems[];
  setAllItems: React.Dispatch<React.SetStateAction<ShoppingItems[]>>;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
}

export { ShoppingItems, ShoppingCart, IndividualItemProps, AppContextProps };
