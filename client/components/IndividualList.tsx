import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "../ShoppingCartProps";
import DeleteListButton from "./DeleteListButton";
import "../App.css";
import { ShoppingItems } from "../ShoppingCartProps";
import IndividualItem from "./IndividualItem";
import EditingListInput from "./EditingListInput";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosArrowDropup, IoIosArrowDropdown, IoMdAddCircleOutline } from "react-icons/io";


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
  const [backgroundColor, setBackgroundColor] = useState("");

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

    setAllItems(data);
  };

  const handleAddItem = async (): Promise<void> => {
    if (item.length < 3) {
      setBackgroundColor("red");
      console.log("item you are tryning to add is too hshort");
      return;
    }

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
        setIsAddItemBtnClicked(false);
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

  const toggleShow = () => {
    setShowList(prevState => !prevState);
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
        className="individual-list"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="2"
        color="blue"
      >
        {editingList ? (
          <EditingListInput value={editedListName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedListName(e.target.value)}
                            onClick={handleEditListClick} onClick1={handleCancelEditAddList} ref={forwardedInputRef}
                            backgroundColor={backgroundColor} />
        ) : (
          <p>{editedListName}</p>
        )}
        {isAddItemBtnClicked ? (
          <div>
            <input
              type="text"
              placeholder="Add item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              ref={addItemInputRef}
              style={{ backgroundColor: backgroundColor }}
            />

            <button onClick={handleAddItem}>✔</button>
            <button onClick={() => setIsAddItemBtnClicked(false)}>X</button>
          </div>
        ) : (
          <IoMdAddCircleOutline onClick={handleAddItemButton} style={{fontSize:'2em'}} />
        )}
        {
          editingList ? <MdOutlineCancel onClick={() => {
              setEditingList(prevState => !prevState);
              handleCancelEditAddList();
            }} style={{ marginLeft: "auto", fontSize: '2em' }} /> :
            <AiOutlineEdit style={{ marginLeft: "auto", fontSize:'2em' }}
                           onClick={() => {
                             setEditingList(prevState => !prevState);
                             focusOnInput();
                           }} />
        }


        {
          filteredItemsById.length !== 0 && showList ? <IoIosArrowDropup onClick={toggleShow} style={{fontSize:'2em'}} /> :
            <IoIosArrowDropdown onClick={toggleShow} style={{fontSize:'2em'}}/>


        }

        <DeleteListButton
          id={list.id}
          setAllLists={setAllLists}
          allItems={allItems}
        />
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
