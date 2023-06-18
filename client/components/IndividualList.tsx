import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, ShoppingItems } from "../ShoppingCartProps";
import DeleteListButton from "./DeleteListButton";
import IndividualItem from "./IndividualItem";
import EditingListInput from "./EditingListInput";
import "../App.css";

//React Icons
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel, MdDoneOutline } from "react-icons/md";
import {
  IoIosAddCircleOutline,
  IoIosArrowDropdown,
  IoIosArrowDropup,
} from "react-icons/io";

interface IndividualItemProps {
  list: ShoppingCart;
  setAllLists: (
    value: ((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[]
  ) => void;
}

function IndividualList({ list, setAllLists }: IndividualItemProps) {
  const [item, setItem] = useState<string>("");
  const [allItems, setAllItems] = useState<ShoppingItems[]>([]);
  const [isAddItemBtnClicked, setIsAddItemBtnClicked] = useState(false);
  const [showList, setShowList] = useState(false);
  const [editingList, setEditingList] = useState(false);
  const [editedListName, setEditedListName] = useState(list.name);
  const [originalListName, setOriginalListName] = useState(list.name);

  interface initialStateProps {
    item: string;
    allItems: ShoppingItems[];
    isAddItemBtnClicked: boolean;
    showList: boolean;
    editingList: boolean;
    editedListName: string;
    originalListName: string;
  }

  const initialState: initialStateProps = {
    item: "",
    allItems: [],
    isAddItemBtnClicked: false,
    showList: false,
    editingList: false,
    editedListName: list.name,
    originalListName: list.name,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    focusOnInput();
  }, [editingList]);

  useEffect(() => {
    if (isAddItemBtnClicked && addItemInputRef.current) {
      addItemInputRef.current.focus();
    }
  }, [isAddItemBtnClicked]);

  const fetchItem = async () => {
    const response = await fetch(`http://127.0.0.1:1337/list/${list.id}/item`);
    const data = await response.json();

    setState((prevState) => ({
      ...prevState,
      allItems: data,
    }));
  };

  const handleAddItem = async (): Promise<void> => {
    if (item.length < 3) {
      console.log("Items need to be at least three characters long");
      return;
    }

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

        setState((prevState) => ({
          ...prevState,
          allItems: [...prevState.allItems, newItem],
          item: "",
          isAddItemBtnClicked: false,
        }));
      }
    } catch (error) {
      console.error(`Failed to add item: ${error} `);
    }
  };

  const handleEditListClick = async () => {
    setState((prevState) => ({
      ...prevState,
      editedListName: editedListName,
      editingList: false,
    }));

    try {
      await fetch(
        `http://127.0.0.1:1337/list/${list.id}?name=${editedListName}`,
        {
          method: "PATCH",
        }
      );
      setState((prevState) => ({
        ...prevState,
        originalListName: editedListName,
      }));
    } catch (error) {
      console.log(`Failed updating list name: ${error}`);
    }
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
        setState((prevState) => ({
          ...prevState,
          allItems: [
            ...prevState.allItems.filter((item) => item.id !== itemId),
          ],
        }));
      }
    } catch (error) {
      console.error(`Failed deleting item: ${error}`);
    }
  };

  const handleAddItemButton = () => {
    setState((prevState) => ({
      ...prevState,
      isAddItemBtnClicked: false,
      item: "",
    }));
  };

  const handleCancelEditAddList = () => {
    setState((prevState) => ({
      ...prevState,
      editingList: false,
      editedListName: originalListName,
    }));

    if (addItemInputRef.current) {
      addItemInputRef.current.value = "";
    }
  };

  const toggleShow = () => {
    setState((prevState) => ({
      ...prevState,
      showList: !prevState.showList,
    }));
  };

  const focusOnInput = () => {
    forwardedInputRef.current?.focus();
  };

  const filteredItemsById = allItems.filter((item) => item.listId === list.id);
  const addItemInputRef = useRef<HTMLInputElement>(null);
  const forwardedInputRef = useRef<HTMLInputElement>(null);

  const itemDisplay = showList ? "flex" : "none";

  return (
    <div p="3">
      <li
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="2"
        color="blue"
        className="list--individual"
      >
        {editingList ? (
          <EditingListInput
            value={editedListName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedListName(e.target.value)
            }
            onClick={handleEditListClick}
            ref={forwardedInputRef}
          />
        ) : (
          <p>{editedListName}</p>
        )}
        {allItems.length !== 0 ? (
          showList ? (
            <IoIosArrowDropup onClick={toggleShow} className="icon" />
          ) : (
            <IoIosArrowDropdown onClick={toggleShow} className="icon" />
          )
        ) : null}
        {isAddItemBtnClicked ? (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
            }}
          >
            <input
              type="text"
              placeholder="Add item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              ref={addItemInputRef}
              className="add-item-input"
              onKeyDown={(event) => event.key === "Enter" && handleAddItem()}
            />
            <MdDoneOutline
              onClick={handleAddItem}
              className="icon save-icon"
              style={{ alignSelf: "center" }}
            />
            <MdOutlineCancel
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  isAddItemBtnClicked: false,
                }))
              }
              className="icon delete-icon"
              style={{ alignSelf: "center" }}
            />
          </div>
        ) : (
          <IoIosAddCircleOutline
            onClick={handleAddItemButton}
            className="icon save-icon"
            style={{ marginLeft: "auto" }}
          />
        )}
        {editingList ? (
          <MdOutlineCancel
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                editingList: !prevState.editingList,
              }));
              handleCancelEditAddList();
            }}
            className="icon delete-icon"
          />
        ) : (
          <AiOutlineEdit
            className="icon edit-icon"
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                editingList: !prevState.editingList,
              }));
              focusOnInput();
            }}
          />
        )}

        <DeleteListButton
          id={list.id}
          setAllLists={setAllLists}
          allItems={allItems}
        />
        <div display="flex" flexDirection="column">
          <p>{`Completed: ${
            allItems.filter((item) => item.isDone === 1).length
          }/${allItems.length} items`}</p>
        </div>
      </li>
      <ul
        style={
          allItems.length !== 0 && showList
            ? {
                borderRadius: "5px",
                marginTop: "0.5em",
              }
            : {}
        }
      >
        {filteredItemsById.map((item) => (
          <IndividualItem
            item={item}
            key={item.id}
            itemDisplay={itemDisplay}
            handleDeleteItem={handleDeleteItem}
            listId={list.id}
            allItems={allItems}
            setAllItems={setAllItems}
          />
        ))}
      </ul>
    </div>
  );
}

export default IndividualList;
