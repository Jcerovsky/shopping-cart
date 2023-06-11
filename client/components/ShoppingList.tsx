import React, { useEffect, useState } from "react";
import { ShoppingCart } from "../ShoppingCartProps";
import IndividualList from "./IndividualList";
import '../App.css'

interface ShoppingItemsProps {
  setAllLists: (
    value: ((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[]
  ) => void;
  allLists: ShoppingCart[];
}


function ShoppingList({ allLists, setAllLists }: ShoppingItemsProps) {

  return (
    <div className='list' >
      <ul>
        {allLists.length !== 0? (
          allLists.map((list) => (
            <IndividualList
              list={list}
              key={list.id}
              setAllLists={setAllLists}
            />
          ))
        ) : (
          <p>Loading...</p>
          )
        }
      </ul>
    </div>
  );
}

export default ShoppingList;
