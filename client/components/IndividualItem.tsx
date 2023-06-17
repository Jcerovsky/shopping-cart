import React, { useEffect, useState } from "react";
import { ShoppingItems } from "../ShoppingCartProps";
import { MdDoneOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImCheckboxUnchecked } from "react-icons/im";
import "../App.css";

interface Props {
  item: ShoppingItems;
  itemDisplay: "none" | "flex";
  handleDeleteItem: (itemId: number) => Promise<void>;
  listId: number;
  setCompletedItems: (count: number) => void;
  allItems: ShoppingItems[];
}

function IndividualItem({
  item,
  itemDisplay,
  handleDeleteItem,
  listId,
  setCompletedItems,
  allItems,
}: Props) {
  const [isClicked, setIsClicked] = useState(item.isDone === 1);

  useEffect(() => {
    const updateItems = async () => {
      try {
        await fetch(
          `http://127.0.0.1:1337/list/${listId}/item/${item.id}?isDone=${
            isClicked ? "1" : "0"
          }`,
          {
            method: "PATCH",
          }
        );

        const response = await fetch(
          `http://127.0.0.1:1337/list/${listId}/item`
        );
        const updatedItems = await response.json();
        setCompletedItems(
          updatedItems.filter((item: ShoppingItems) => item.isDone === 1).length
        );
      } catch (error) {
        console.log(`Failed updating item: ${error}`);
      }
    };
    updateItems();
  }, [isClicked, setCompletedItems]);

  return (
    <li
      display={itemDisplay}
      className="individual-item"
      key={item.id}
      style={isClicked ? { backgroundColor: "lightgreen" } : {}}
    >
      {isClicked ? (
        <MdDoneOutline
          onClick={() => setIsClicked((prevState) => !prevState)}
          className="icons save-icon"
        />
      ) : (
        <ImCheckboxUnchecked
          onClick={() => setIsClicked((prevState) => !prevState)}
          className="icons "
        />
      )}
      <p>{item.text}</p>
      <RiDeleteBin6Line
        onClick={() => handleDeleteItem(item.id)}
        style={{ marginLeft: "auto" }}
        className="icons delete-icon"
      />
    </li>
  );
}

export default IndividualItem;
