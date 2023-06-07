import React, { useEffect, useState } from "react";
import { ShoppingCart } from "../ShoppingCartProps";
import DeleteButton from "./DeleteButton";
import "../App.css";
import { ShoppingItems } from "../ShoppingCartProps";

interface IndividualItemProps {
  list: ShoppingCart;
  setAllLists: (
    value: ((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[]
  ) => void;
}

function IndividualList({ list, setAllLists }: IndividualItemProps) {
  const [item, setItem] = useState<string>("");
  const [allItems, setAllItems] = useState<ShoppingItems[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const [editingList, setEditingList] = useState(false);
  const [editedListName, setEditedListName] = useState(list.name);

  const [editingItem, setEditingItem] = useState(false);
  const [editingItemName, setEditingItemName] = useState(false);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const response = await fetch(`http://127.0.0.1:1337/list/${list.id}/item`);
    const data = await response.json();

    setAllItems(data);
  };

  const handleAddItem = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://127.0.0.1:1337/list/${list.id}/item?text=${item}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const newItemId = await response.json();

        const newItem = {
          id: newItemId,
          text: item,
          isDone: 0,
          listId: list.id,
        };

        setAllItems((prevState) => [...prevState, newItem]);
        setItem("");
        setIsClicked(false);
      }
    } catch (error) {
      console.error(`Failed to add item: ${error} `);
    }
  };

  const handleEditListClick = () => {
    setItem(editedListName);
    setEditingList(false);
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:1337/list/${list.id}/item/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAllItems((prevState) =>
          prevState.filter((item) => item.id !== itemId)
        );
      }
    } catch (error) {
      console.error(`Failed deleting item: ${error}`);
    }
  };

  const handleCancelEditAddItem = () => {
    setIsClicked(true);
    setItem("");
  };

  const handleCancelEditAddList = () => {
    setEditingList(true);
    setItem(item);
  };

  console.log("allitems", allItems);

  const filteredItemsById = allItems.filter((item) => item.listId === list.id);

  return (
    <div p="3">
      <li
        className="individual-list"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="2"
        border="1"
      >
        {editingList ? (
          <>
            <input
              type="text"
              placeholder="Add item"
              value={editedListName}
              onChange={(e) => setEditedListName(e.target.value)}
            />
            <button onClick={handleEditListClick}>✔</button>
            <button onClick={() => setEditingList(false)}>X</button>
          </>
        ) : (
          <p>{editedListName ? editedListName : list.name}</p>
        )}
        {isClicked ? (
          <div>
            <input
              type="text"
              placeholder="Add item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />

            <button onClick={handleAddItem}>✔</button>
            <button onClick={() => setIsClicked(false)}>X</button>
          </div>
        ) : (
          <button onClick={handleCancelEditAddItem}>Add item</button>
        )}
        <button
          style={{ marginLeft: "auto" }}
          onClick={handleCancelEditAddList}
        >
          Edit list
        </button>
        <div>
          <DeleteButton
            id={list.id}
            setAllLists={setAllLists}
            allItems={allItems}
          />
        </div>
      </li>
      <ul>
        {filteredItemsById.map((item) => (
          <li key={item.id}>
            <input type="checkbox" />
            {item.text}
            <button>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndividualList;
