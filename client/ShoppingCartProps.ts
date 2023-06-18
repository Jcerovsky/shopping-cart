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

export { ShoppingItems, ShoppingCart, InitialStateProps, IndividualItemProps };
