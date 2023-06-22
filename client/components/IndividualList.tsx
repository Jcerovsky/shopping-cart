import React, { useContext, useEffect, useRef, useState } from "react";
import { ShoppingCart, ShoppingItems } from "../ShoppingCartProps";
import DeleteListButton from "./DeleteListButton";
import IndividualItem from "./IndividualItem";
import EditingListInput from "./EditingListInput";
import "../App.css";

//React Icons
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel, MdOutlineFileDownloadDone } from "react-icons/md";
import {
  IoIosAddCircleOutline,
  IoIosArrowDropdown,
  IoIosArrowDropup,
} from "react-icons/io";
import { createRequest } from "../utils/createRequest";

interface Props {
  list: ShoppingCart;
}

function IndividualList({ list }: Props) {
  const [editedListName, setEditedListName] = useState(list.name);
  const [originalListName, setOriginalListName] = useState(list.name);
  const [editingList, setEditingList] = useState<boolean>(false);
  const [isAddItemBtnClicked, setIsAddItemBtnClicked] =
    useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
  const [allItems, setAllItems] = useState<ShoppingItems[]>([]);
  const [item, setItem] = useState<string>("");

  useEffect(() => {
    fetchItem();
  }, [list.id]);

  useEffect(() => {
    focusOnInput();
  }, [editingList]);

  useEffect(() => {
    if (isAddItemBtnClicked && addItemInputRef.current) {
      addItemInputRef.current.focus();
    }
  }, [isAddItemBtnClicked]);

  const fetchItem = async () => {
    const response = await createRequest(`list/${list.id}/item`, "GET");
    const data = await response.json();
    console.log(`data for ${list.id}`, data);
    setAllItems(data);
  };

  const handleAddItem = async (): Promise<void> => {
    if (item.length < 3) {
      console.log("Items need to be at least three characters long");
      return;
    }
    setShowList(true);
    try {
      const response = await createRequest(
        `list/${list.id}/item?text=${item}`,
        "POST"
      );

      if (response.ok) {
        const newItemId = await response.json();

        const newItem = {
          id: newItemId,
          text: item as string,
          isDone: 0,
          listId: list.id,
        };

        //use sort method to sort based on date created at
        setAllItems((prevState) => [...prevState, newItem]);
        setItem("");
      }
    } catch (error) {
      console.error(`Failed to add item: ${error} `);
    }
  };

  const handleEditListClick = async () => {
    setIsAddItemBtnClicked(false);
    setEditingList(false);
    setEditedListName(editedListName);

    try {
      await createRequest(`list/${list.id}?name=${editedListName}`, "PATCH");

      setOriginalListName(editedListName);
    } catch (error) {
      console.log(`Failed updating list name: ${error}`);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      const response = await createRequest(
        `list/${list.id}/item/${itemId}`,
        "DELETE"
      );

      if (response.ok) {
        setAllItems(allItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error(`Failed deleting item: ${error}`);
    }
  };

  const handleAddItemButton = () => {
    setIsAddItemBtnClicked(true);
    setItem("");
  };

  const handleCancelEditAddList = () => {
    setEditingList(false);
    setEditedListName(originalListName);

    if (addItemInputRef.current) {
      addItemInputRef.current.value = "";
    }
  };

  const setShowListToggle = () => {
    setShowList((prevState) => !prevState);
  };

  const focusOnInput = () => {
    forwardedInputRef.current?.focus();
  };

  const addItemInputRef = useRef<HTMLInputElement>(null);
  const forwardedInputRef = useRef<HTMLInputElement>(null);

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
            onChange={(e) => setEditedListName(e.target.value)}
            onClick={handleEditListClick}
            ref={forwardedInputRef}
            editedListName={editedListName}
          />
        ) : (
          <p>{editedListName}</p>
        )}
        {editingList ? (
          <MdOutlineCancel
            onClick={() => {
              setEditingList((prevState) => !prevState);
              handleCancelEditAddList();
            }}
            className="icon delete-icon"
          />
        ) : (
          <AiOutlineEdit
            className="icon"
            onClick={() => {
              setEditingList((prevState) => !prevState);

              focusOnInput();
            }}
          />
        )}
        {allItems.filter((item) => item.listId === list.id).length !== 0 ? (
          showList ? (
            <IoIosArrowDropup onClick={setShowListToggle} className="icon" />
          ) : (
            <IoIosArrowDropdown onClick={setShowListToggle} className="icon" />
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
              onChange={(e) => {
                setItem(e.target.value);
              }}
              ref={addItemInputRef}
              className="add-item-input"
              onKeyDown={(event) => event.key === "Enter" && handleAddItem()}
            />
            <MdOutlineFileDownloadDone
              onClick={handleAddItem}
              className="icon save-icon"
              style={{ alignSelf: "center" }}
            />
            <MdOutlineCancel
              onClick={() => setIsAddItemBtnClicked(false)}
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

        <DeleteListButton id={list.id} allItems={allItems} />
        <div display="flex" flexDirection="column">
          <p>{`${
            allItems.filter(
              (item) => item.listId === list.id && item.isDone === 1
            ).length
          }/${
            allItems.filter((item) => item.listId === list.id).length
          } items`}</p>
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
        {allItems.map((item) => (
          <IndividualItem
            key={item.id}
            handleDeleteItem={handleDeleteItem}
            listId={list.id}
            item={item}
            showList={showList}
            allItems={allItems}
            setAllItems={setAllItems}
          />
        ))}
      </ul>
    </div>
  );
}

export default IndividualList;
