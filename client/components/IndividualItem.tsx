import React, { useEffect, useRef, useState } from "react";
import { ShoppingItems } from "../ShoppingCartProps";

interface Props {
  item: ShoppingItems,
  itemDisplay: "none" | "block",
  handleDeleteItem: (itemId: number) => Promise<void>,
  listId: number,
}

function IndividualItem({ item, itemDisplay, handleDeleteItem, listId}: Props) {

  const [isClicked, setIsClicked] = useState(item.isDone === 1);

  useEffect(() => {
    try {
      fetch(`http://127.0.0.1:1337/list/${listId}/item/${item.id}?isDone=${isClicked? '1' : '0'}`, {
        method: "PATCH"
      });
    } catch (error) {
      console.log(`Failed updating item: ${error}`);
    }
  }, [isClicked])

  console.log(isClicked)


  return (
    <li display={itemDisplay} key={item.id}>
      <p onClick={() => setIsClicked(prevState => !prevState)}>{item.text}</p>
      <div>{isClicked ? "✅" : "⛔️"}</div>
      <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default IndividualItem;