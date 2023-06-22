import React, { useContext } from "react";
import IndividualList from "./IndividualList";
import "../App.css";
import { AppContext } from "../AppContext";

function ShoppingList() {
  const { allLists } = useContext(AppContext)!;

  return (
    <div className="list">
      <ul>
        {allLists.length !== 0 ? (
          allLists.map((list) => <IndividualList list={list} key={list.id} />)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
