import React, { useEffect, useRef, useState } from 'react';
import { IndividualListProps, ShoppingCart } from '../ShoppingCartProps';
import DeleteListButton from './DeleteListButton';
import IndividualItem from './IndividualItem';
import EditingListInput from './EditingListInput';
import '../App.css';

import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel, MdOutlineFileDownloadDone } from 'react-icons/md';
import { IoIosAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { createRequest } from '../utils/createRequest';

interface Props {
  list: ShoppingCart;
}

function IndividualList({ list }: Props) {
  const [state, setState] = useState<IndividualListProps>({
    editedListName: list.name,
    originalListName: list.name,
    editingList: false,
    isAddItemBtnClicked: false,
    showList: false,
    allItems: [],
    item: '',
  });

  const { editedListName, originalListName, editingList, isAddItemBtnClicked, showList, allItems, item } = state;

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
    const data = await createRequest(`list/${list.id}/item`, 'GET');
    setState(prevState => ({
      ...prevState,
      allItems: data,
    }));
  };

  const handleAddItem = async (): Promise<void> => {
    if (item.length < 3) {
      console.log('Items need to be at least three characters long');
      return;
    }
    setState(prevState => ({
      ...prevState,
      showList: true,
    }));

    try {
      const data = await createRequest(`list/${list.id}/item?text=${item}`, 'POST');
      const newItem = {
        id: data,
        text: item as string,
        isDone: 0,
        listId: list.id,
      };

      setState(prevState => ({
        ...prevState,
        allItems: [...allItems, newItem],
        item: '',
      }));
    } catch (error) {
      console.error(`Failed to add item: ${error} `);
    }
  };

  const handleEditListClick = async () => {
    setState(prevState => ({
      ...prevState,
      editingList: false,
      editedListName: editedListName,
    }));
    try {
      await createRequest(`list/${list.id}?name=${editedListName}`, 'PATCH');

      setState(prevState => ({
        ...prevState,
        originalListName: editedListName,
      }));
    } catch (error) {
      console.log(`Failed updating list name: ${error}`);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await createRequest(`list/${list.id}/item/${itemId}`, 'DELETE');

      setState(prevState => ({
        ...prevState,
        allItems: allItems.filter(item => item.id !== itemId),
      }));
    } catch (error) {
      console.error(`Failed deleting item: ${error}`);
    }
  };

  const handleAddItemButton = () => {
    setState(prevState => ({
      ...prevState,
      isAddItemBtnClicked: true,
      item: '',
    }));
  };

  const handleCancelEditAddList = () => {
    setState(prevState => ({
      ...prevState,
      editingList: false,
      editedListName: originalListName,
    }));

    if (addItemInputRef.current) {
      addItemInputRef.current.value = '';
    }
  };

  const setShowListToggle = () => {
    setState(prevState => ({
      ...prevState,
      showList: !prevState.showList,
    }));
  };

  const focusOnInput = () => {
    forwardedInputRef.current?.focus();
  };

  const addItemInputRef = useRef<HTMLInputElement>(null);
  const forwardedInputRef = useRef<HTMLInputElement>(null);

  return (
    <div p="3">
      <li display="flex" justifyContent="center" alignItems="center" gap="2" color="blue" className="list--individual">
        {editingList ? (
          <EditingListInput
            onChange={e =>
              setState(prevState => ({
                ...prevState,
                editedListName: e.target.value,
              }))
            }
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
              setState(prevState => ({
                ...prevState,
                editingList: !prevState.editingList,
              }));
              handleCancelEditAddList();
            }}
            className="icon delete-icon"
          />
        ) : (
          <AiOutlineEdit
            className="icon"
            onClick={() => {
              setState(prevState => ({
                ...prevState,
                editingList: !prevState.editingList,
              }));

              focusOnInput();
            }}
          />
        )}
        {allItems.filter(item => item.listId === list.id).length !== 0 ? (
          showList ? (
            <IoIosArrowDropup onClick={setShowListToggle} className="icon" />
          ) : (
            <IoIosArrowDropdown onClick={setShowListToggle} className="icon" />
          )
        ) : null}
        {isAddItemBtnClicked ? (
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
            }}
          >
            <input
              type="text"
              placeholder="Add item"
              value={item}
              onChange={e => {
                setState(prevState => ({
                  ...prevState,
                  item: e.target.value,
                }));
              }}
              ref={addItemInputRef}
              className="add-item-input"
              onKeyDown={event => event.key === 'Enter' && handleAddItem()}
            />
            <MdOutlineFileDownloadDone
              onClick={handleAddItem}
              className="icon save-icon"
              style={{ alignSelf: 'center' }}
            />
            <MdOutlineCancel
              onClick={() =>
                setState(prevState => ({
                  ...prevState,
                  isAddItemBtnClicked: false,
                }))
              }
              className="icon delete-icon"
              style={{ alignSelf: 'center' }}
            />
          </div>
        ) : (
          <IoIosAddCircleOutline
            onClick={handleAddItemButton}
            className="icon save-icon"
            style={{ marginLeft: 'auto' }}
          />
        )}

        <DeleteListButton id={list.id} />
        <div display="flex" flexDirection="column">
          <p>{`${allItems.filter(item => item.listId === list.id && item.isDone === 1).length}/${
            allItems.filter(item => item.listId === list.id).length
          } items`}</p>
        </div>
      </li>

      <ul
        style={
          allItems.length !== 0 && showList
            ? {
                borderRadius: '5px',
                marginTop: '0.5em',
              }
            : {}
        }
      >
        {allItems.map(item => (
          <IndividualItem
            key={item.id}
            handleDeleteItem={handleDeleteItem}
            listId={list.id}
            item={item}
            showList={showList}
            allItems={allItems}
            setState={setState}
          />
        ))}
      </ul>
    </div>
  );
}

export default IndividualList;
