import React, { useEffect, useRef, useState } from "react";
import { ShoppingItems } from "../ShoppingCartProps";
import { AiOutlineEdit } from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'

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


  return (
    <li display={itemDisplay} key={item.id}>
      <p>{item.text}</p>
      <AiOutlineEdit onClick={() => setIsClicked(prevState => !prevState)}/>
      <div>{isClicked ? "✅" : "⛔️"}</div>
      <RiDeleteBin6Line onClick={() => handleDeleteItem(item.id)}/>
    </li>
  );
}

export default IndividualItem;