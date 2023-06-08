import React from "react";
import { ShoppingCart } from "../ShoppingCartProps";
import IndividualList from "./IndividualList";

interface ShoppingItemsProps {
  setAllLists: (
    value: ((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[]
  ) => void;
  allLists: ShoppingCart[];
  setList: (value: (string | ((prevState: string) => string))) => void;
}

function ShoppingList({ allLists, setAllLists, setList }: ShoppingItemsProps) {
  console.log("allLists", allLists);
  return (
    <div>
      <ul>
        {allLists.length !== 0 ? (
          allLists.map((list) => (
            <IndividualList
              list={list}
              key={list.id}
              setAllLists={setAllLists}
              setList={setList}
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
