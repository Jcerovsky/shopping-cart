import React, { useEffect, useState } from "react";
import { ShoppingItems } from "../ShoppingCartProps";
import { MdDoneOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../App.css";

interface Props {
  item: ShoppingItems,
  itemDisplay: "none" | "flex",
  handleDeleteItem: (itemId: number) => Promise<void>,
  listId: number,
  setCompletedItems:  React.Dispatch<React.SetStateAction<number>>,
  allItems:  ShoppingItems[],

}

function IndividualItem({ item, itemDisplay, handleDeleteItem, listId, setCompletedItems, allItems}: Props) {

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



  const updateIsDone = () => {
    console.log(allItems.filter(item => item.isDone === 1))
  }




  return (
    <li display={itemDisplay} className='individual-item' key={item.id} style={isClicked? {backgroundColor: 'tomato'} : {}}>
      <MdDoneOutline onClick={() => {
        setIsClicked(prevState => !prevState);
        updateIsDone()
      }}  className='icons' />
      <p>{item.text}</p>
      <RiDeleteBin6Line onClick={() => handleDeleteItem(item.id)} style={{marginLeft:"auto"}} className='icons'/>
    </li>
  );
}

export default IndividualItem;