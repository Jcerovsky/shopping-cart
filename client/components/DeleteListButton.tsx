import React, { useContext } from "react";
import { ShoppingCart, ShoppingItems } from "../ShoppingCartProps";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../App.css";
import { AppContext, } from "../AppContext";

interface Props {
  id: number;
}

function DeleteListButton({ id }: Props) {

  const appContext = useContext(AppContext)

  const handleDelete = async () => {
    if (appContext !== undefined) {
      const listToDelete = appContext.allItems.filter((item) => item.listId === id);
      try {
        await Promise.all(
          listToDelete.map(async (item) => {
            await fetch(`http://127.0.0.1:1337/list/${item.listId}`, {
              method: "DELETE",
            });
          })
        );
        if (listToDelete?.length === 0) {
          await fetch(`http://127.0.0.1:1337/list/${id}`, {
            method: "DELETE",
          });
        }
      } catch (error) {
        throw new Error(`Error deleting item:' ${error}`);
      }
    }

    appContext?.setAllLists((prevList) => prevList.filter((item) => item.id !== id));

  };

  return (
    <RiDeleteBin6Line onClick={handleDelete} className="icon delete-icon" />
  );
}

export default DeleteListButton;
