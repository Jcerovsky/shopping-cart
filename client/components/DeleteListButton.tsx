import React from "react";
import { ShoppingCart, ShoppingItems } from "../ShoppingCartProps";
import {RiDeleteBin6Line} from 'react-icons/ri'


interface DeleteButtonProps {
  id: number;
  setAllLists: (
    value: ((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[]
  ) => void;
  allItems: ShoppingItems[];
}

function DeleteListButton({ id, setAllLists, allItems }: DeleteButtonProps) {
  const handleDelete = async () => {
    const listToDelete = allItems.filter((item) => item.listId === id);


    try {
      await Promise.all(
        listToDelete.map(async (item) => {
          await fetch(`http://127.0.0.1:1337/list/${item.listId}`, {
            method: "DELETE",
          });
        })
      );
      if (listToDelete.length === 0) {
        await fetch(`http://127.0.0.1:1337/list/${id}`, {
          method: "DELETE",
        });
      }
    } catch (error) {
      throw new Error(`Error deleting item:' ${error}`);
    }
    setAllLists((prevList) => prevList.filter((item) => item.id !== id));
  };

  const style = {
    fontSize: '2em'
  }



  return (
    <div>
      <RiDeleteBin6Line onClick={handleDelete} style={style} />
    </div>
  );
}

export default DeleteListButton;
