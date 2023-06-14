import React, {useEffect, useRef, useState } from "react";
import { ShoppingCart } from "../ShoppingCartProps";
import DeleteListButton from "./DeleteListButton";
import "../App.css";
import { ShoppingItems } from "../ShoppingCartProps";
import IndividualItem from "./IndividualItem";
import EditingListInput from "./EditingListInput";

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
  const [showList, setShowList] = useState(false);

  const [editingList, setEditingList] = useState(false);
  const [editedListName, setEditedListName] = useState(list.name);
  const [originalListName, setOriginalListName] = useState(list.name);

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    if (isClicked && addItemInputRef.current) {
      addItemInputRef.current.focus();
    }
  }, [isClicked]);


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
          method: "POST"
        }
      );

      if (response.ok) {
        const newItemId = await response.json();

        const newItem = {
          id: newItemId,
          text: item,
          isDone: 0,
          listId: list.id
        };

        setAllItems((prevState) => [...prevState, newItem]);
        setItem("");
        setIsClicked(false);
      }
    } catch (error) {
      console.error(`Failed to add item: ${error} `);
    }
  };

  const handleEditListClick = async () => {
    setEditedListName(editedListName);
    setEditingList(false);
    try {
      await fetch(`http://127.0.0.1:1337/list/${list.id}?name=${editedListName}`, {
        method: "PATCH"
      });
      setOriginalListName(editedListName);
    } catch (error) {
      console.log(`Failed updating list name: ${error}`);
    }

  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:1337/list/${list.id}/item/${itemId}`,
        {
          method: "DELETE"
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

  const handleAddItemButton = () => {
    setIsClicked(true);
    setItem("");

  };

  const handleCancelEditAddList = () => {
    setEditingList(false);
    setEditedListName(originalListName);
    if (addItemInputRef.current) {
      addItemInputRef.current.value = "";
    }
  };

  const toggleShow = () => {
    setShowList(prevState => !prevState);
  };

  const focusOnInput = () => {
      setTimeout(() => {
        forwardedInputRef.current?.focus()
        console.log('worked')
      }, 100)

  }

  const filteredItemsById = allItems.filter((item) => item.listId === list.id);
  const addItemInputRef = useRef<HTMLInputElement>(null);
  const forwardedInputRef = useRef<HTMLInputElement>(null)


  const itemDisplay = showList ? "block" : "none";

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
          <EditingListInput value={editedListName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedListName(e.target.value)}
                            onClick={handleEditListClick} onClick1={handleCancelEditAddList} ref={forwardedInputRef} />
        ) : (
          <p>{editedListName}</p>
        )}
        {isClicked ? (
          <div>
            <input
              type="text"
              placeholder="Add item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              ref={addItemInputRef}
            />

            <button onClick={handleAddItem}>✔</button>
            <button onClick={() => setIsClicked(false)}>X</button>
          </div>
        ) : (
          <button onClick={handleAddItemButton}>Add </button>
        )}
        <button
          mL="auto"
          onClick={() => {
            setEditingList(prevState => !prevState);
            focusOnInput();
          }}
        >
          Edit list
        </button>
        <DeleteListButton
          id={list.id}
          setAllLists={setAllLists}
          allItems={allItems}
        />
        {
          filteredItemsById.length !== 0 &&
          <button onClick={toggleShow}>{showList ? "Hide" : "Show"}</button>
        }
      </li>
      <ul>
        {filteredItemsById.map((item) => (
          <IndividualItem item={item} key={item.id} itemDisplay={itemDisplay} handleDeleteItem={handleDeleteItem}
                          listId={list.id} />

        ))}
      </ul>
    </div>
  );
}

export default IndividualList;
