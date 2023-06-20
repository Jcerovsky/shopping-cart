import React, { useContext, useEffect, useRef } from "react";
import { ShoppingCart } from "../ShoppingCartProps";
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
import { AppContext } from "../AppContext";

interface Props {
  list: ShoppingCart;
}

function IndividualList({ list }: Props) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext?.setEditedListName(list.name);
    appContext?.setOriginalListName(list.name);
  }, []);

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    focusOnInput();
  }, [appContext?.editingList]);

  useEffect(() => {
    if (appContext?.isAddItemBtnClicked && addItemInputRef.current) {
      addItemInputRef.current.focus();
    }
  }, [appContext?.isAddItemBtnClicked]);

  const fetchItem = async () => {
    const response = await fetch(`http://127.0.0.1:1337/list/${list.id}/item`);
    const data = await response.json();

    appContext?.setAllItems(data);
  };

  const handleAddItem = async (): Promise<void> => {
    if (appContext && appContext.item.length < 3) {
      console.log("Items need to be at least three characters long");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:1337/list/${list.id}/item?text=${appContext?.item}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const newItemId = await response.json();

        const newItem = {
          id: newItemId,
          text: appContext?.item as string,
          isDone: 0,
          listId: list.id,
        };

        appContext?.setAllItems((prevState) => [...prevState, newItem]);
        appContext?.setItem("");
        appContext?.setIsAddItemBtnClicked(false);
      }
    } catch (error) {
      console.error(`Failed to add item: ${error} `);
    }
  };

  const handleEditListClick = async () => {
    appContext?.setIsAddItemBtnClicked(false);
    appContext?.setEditingList(false);
    appContext?.setEditedListName(appContext?.editedListName);

    try {
      await fetch(
        `http://127.0.0.1:1337/list/${list.id}?name=${appContext?.editedListName}`,
        {
          method: "PATCH",
        }
      );
      appContext?.setOriginalListName(appContext?.editedListName);
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
        appContext?.setAllItems(
          appContext?.allItems.filter((item) => item.id !== itemId)
        );
      }
    } catch (error) {
      console.error(`Failed deleting item: ${error}`);
    }
  };

  const handleAddItemButton = () => {
    appContext?.setIsAddItemBtnClicked(true);
    appContext?.setItem("");
  };

  const handleCancelEditAddList = () => {
    appContext?.setEditingList(false);
    appContext?.setEditedListName(appContext?.originalListName);

    if (addItemInputRef.current) {
      addItemInputRef.current.value = "";
    }
  };

  const setShowListToggle = () => {
    appContext?.setShowList((prevState) => !prevState);
  };

  const focusOnInput = () => {
    forwardedInputRef.current?.focus();
  };

  const filteredItemsById = appContext?.allItems.filter(
    (item) => item.listId === list.id
  );
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
        {appContext?.editingList ? (
          <EditingListInput
            value={appContext?.editedListName}
            onChange={(e) => appContext?.setEditedListName(e.target.value)}
            onClick={handleEditListClick}
            ref={forwardedInputRef}
          />
        ) : (
          <p>{appContext?.editedListName}</p>
        )}
        {appContext?.editingList ? (
          <MdOutlineCancel
            onClick={() => {
              appContext?.setEditingList((prevState) => !prevState);
              handleCancelEditAddList();
            }}
            className="icon delete-icon"
          />
        ) : (
          <AiOutlineEdit
            className="icon"
            onClick={() => {
              appContext?.setEditingList((prevState) => !prevState);

              focusOnInput();
            }}
          />
        )}
        {appContext?.allItems.length !== 0 ? (
          appContext?.showList ? (
            <IoIosArrowDropup onClick={setShowListToggle} className="icon" />
          ) : (
            <IoIosArrowDropdown onClick={setShowListToggle} className="icon" />
          )
        ) : null}
        {appContext?.isAddItemBtnClicked ? (
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
              value={appContext?.item}
              onChange={(e) => {
                appContext?.setItem(e.target.value);
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
              onClick={() => appContext?.setIsAddItemBtnClicked(false)}
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

        <DeleteListButton id={list.id} />
        <div display="flex" flexDirection="column">
          <p>{`Completed: ${
            appContext?.allItems.filter((item) => item.isDone === 1).length
          }/${appContext?.allItems.length} items`}</p>
        </div>
      </li>
      <ul
        style={
          appContext?.allItems.length !== 0 && appContext?.showList
            ? {
                borderRadius: "5px",
                marginTop: "0.5em",
              }
            : {}
        }
      >
        {filteredItemsById &&
          filteredItemsById.map((item) => (
            <IndividualItem
              key={item.id}
              handleDeleteItem={handleDeleteItem}
              listId={list.id}
              item={item}
            />
          ))}
      </ul>
    </div>
  );
}

export default IndividualList;
