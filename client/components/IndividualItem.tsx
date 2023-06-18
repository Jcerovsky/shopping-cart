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
  allItems: ShoppingItems[];
  setAllItems: React.Dispatch<React.SetStateAction<ShoppingItems[]>>;
}

function IndividualItem({
  item,
  itemDisplay,
  handleDeleteItem,
  listId,
  setAllItems,
  allItems,
}: Props) {
  const [isClicked, setIsClicked] = useState(item.isDone === 1);

  useEffect(() => {
    const updateItem = async () => {
      try {
        const updatedItems = allItems.map((existingItem) => {
          if (existingItem.id === item.id) {
            return {
              ...item,
              isDone: isClicked ? 1 : 0,
            };
          }
          return existingItem;
        });

        setAllItems(updatedItems);

        await fetch(
          `http://127.0.0.1:1337/list/${listId}/item/${item.id}?isDone=${
            isClicked ? "1" : "0"
          }`,
          {
            method: "PATCH",
          }
        );
      } catch (error) {
        console.log(`Failed updating item: ${error}`);
      }
    };
    updateItem();
  }, [isClicked]);

  return (
    <li
      display={itemDisplay}
      className="individual-item"
      key={item.id}
      style={isClicked ? { opacity: "0.5", background: "lightseagreen" } : {}}
    >
      {isClicked ? (
        <MdDoneOutline
          onClick={() => setIsClicked((prevState) => !prevState)}
          className="icon"
          style={{ background: "seagreen" }}
        />
      ) : (
        <ImCheckboxUnchecked
          onClick={() => setIsClicked((prevState) => !prevState)}
          className="icon save-icon"
        />
      )}
      <p
        style={
          isClicked
            ? {
                textDecoration: "line-through",
                textDecorationColor: "green",
              }
            : {}
        }
      >
        {item.text}
      </p>
      <RiDeleteBin6Line
        onClick={() => handleDeleteItem(item.id)}
        style={{ marginLeft: "auto" }}
        className="icon delete-icon"
      />
    </li>
  );
}

export default IndividualItem;
