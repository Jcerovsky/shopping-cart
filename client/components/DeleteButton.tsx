import React from "react";
import { ShoppingCart, ShoppingItems } from "../ShoppingCartProps";

interface DeleteButtonProps {
  id: number;
  setAllLists: (
    value: ((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[]
  ) => void;
  allItems: ShoppingItems[];
}

function DeleteButton({ id, setAllLists, allItems }: DeleteButtonProps) {
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

  return (
    <div>
      <button p="1" borderRadius="" onClick={handleDelete}>
        Delete list
      </button>
    </div>
  );
}

export default DeleteButton;
