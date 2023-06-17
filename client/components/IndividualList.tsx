import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, ShoppingItems } from "../ShoppingCartProps";
import DeleteListButton from "./DeleteListButton";
import "../App.css";
import IndividualItem from "./IndividualItem";
import EditingListInput from "./EditingListInput";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";


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
  const [completedItems, setCompletedItems] = useState(0)

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

  const updatedCompletedItems = (count: number) => {
    setCompletedItems(count)
  }


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
        className='list--individual'
      >
        {editingList ? (
          <EditingListInput value={editedListName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedListName(e.target.value)}
                            onClick={handleEditListClick} ref={forwardedInputRef}
                            backgroundColor={backgroundColor} />
        ) : (
          <p>{editedListName}</p>
        )}
        {
          allItems.length !== 0? showList ?
            <IoIosArrowDropup onClick={toggleShow} className='icons' /> :
            <IoIosArrowDropdown onClick={toggleShow} className='icons' /> : null
        }
        {isAddItemBtnClicked ? (
          <div style={{marginLeft:'auto'}} >
            <input
              type="text"
              placeholder="Add item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              ref={addItemInputRef}
              style={{ backgroundColor: backgroundColor, marginLeft:'auto'}}
            />

            <button onClick={handleAddItem}>✔</button>
            <button onClick={() => setIsAddItemBtnClicked(false)}>X</button>
          </div>
        ) : (
          <IoIosAddCircleOutline onClick={handleAddItemButton} className='icons' style={{marginLeft: "auto" }} />
        )}
        {
          editingList ? <MdOutlineCancel onClick={() => {
              setEditingList(prevState => !prevState);
              handleCancelEditAddList();
            }}  className='icons'/> :
            <AiOutlineEdit className='icons'
                           onClick={() => {
                             setEditingList(prevState => !prevState);
                             focusOnInput();
                           }} />
        }

        <DeleteListButton
          id={list.id}
          setAllLists={setAllLists}
          allItems={allItems}
        />
        <div display='flex' flexDirection='column'>
          {/*<p>{`Items in the list: ${allItems.length}`}</p>*/}
          <p>{`Completed: ${completedItems}/${allItems.length} items`}</p>
        </div>
      </li>
      <ul style={allItems.length!==0 && showList? {border: '1px solid #000000', borderRadius:'5px', marginTop:'0.5em'} : {} } >
        {filteredItemsById.map((item) => (
          <IndividualItem item={item} key={item.id} itemDisplay={itemDisplay} handleDeleteItem={handleDeleteItem}
                          listId={list.id} setCompletedItems={updatedCompletedItems} allItems={allItems} />
        ))}
      </ul>
    </div>
  );
}

export default IndividualList;
