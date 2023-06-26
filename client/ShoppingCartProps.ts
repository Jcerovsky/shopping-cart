import React from 'react';

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
  allItems: ShoppingItems[];
  setState: React.Dispatch<React.SetStateAction<IndividualListProps>>;
}

interface IndividualListProps {
  editedListName: string;
  originalListName: string;
  editingList: boolean;
  isAddItemBtnClicked: boolean;
  showList: boolean;
  allItems: ShoppingItems[];
  item: string;
}

interface AppContextProps {
  list: string;
  setList: React.Dispatch<React.SetStateAction<string>>;
  allLists: ShoppingCart[];
  setAllLists: React.Dispatch<React.SetStateAction<ShoppingCart[]>>;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  limitPerPage: number;
  setLimitPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export { ShoppingItems, ShoppingCart, IndividualItemProps, AppContextProps, IndividualListProps };
