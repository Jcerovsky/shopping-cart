import React from "react";
import { ShoppingItems } from "../ShoppingCartProps";

interface Props {
  item: ShoppingItems,
  itemDisplay: 'none' | 'block',
  handleDeleteItem: (itemId: number) => Promise<void>
}

function IndividualItem({item, itemDisplay, handleDeleteItem}: Props) {
  return (
    <li style={{ display: itemDisplay }} key={item.id}>
      {item.text}
      <input type="checkbox" />
      <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default IndividualItem;