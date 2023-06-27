import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdDoneOutline, MdOutlineCancel, MdOutlineFileDownloadDone } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { IndividualItemProps } from '../ShoppingCartProps';
import '../App.css';
import { createRequest } from '../utils/createRequest';
import { AppContext } from '../AppContext';
import { AiOutlineEdit } from 'react-icons/ai';

function IndividualItem({ handleDeleteItem, listId, item, showList, allItems, setState }: IndividualItemProps) {
  const [isClicked, setIsClicked] = useState(item.isDone === 1);
  const [isItemEdited, setIsItemEdited] = useState<boolean>(false);
  const [editedItemName, setEditedItemName] = useState<string>(item.text);
  const [originalItemName, setOriginalItemName] = useState<string>(item.text);

  const { setErrorMessage } = useContext(AppContext)!;

  useEffect(() => {
    try {
      const updatedItems = allItems.map(existingItem => {
        if (existingItem.id === item.id) {
          return {
            ...existingItem,
            isDone: isClicked ? 1 : 0,
          };
        }
        return existingItem;
      });

      setState(prevState => ({
        ...prevState,
        allItems: updatedItems,
      }));

      createRequest(`list/${listId}/item/${item.id}?isDone=${isClicked ? '1' : '0'}`, 'PATCH');
    } catch (error) {
      setErrorMessage(`error updating list:' ${error}`);
    }
  }, [isClicked]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isItemEdited]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancelEdit = () => {
    setIsItemEdited(false);
    setEditedItemName(originalItemName);

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleEditItem = async () => {
    if (editedItemName.length < 3) {
      setErrorMessage('error: items need to be at least three characters long');
      return;
    }

    setErrorMessage('');
    setEditedItemName(editedItemName);
    setIsItemEdited(false);

    if (editedItemName !== editedItemName) {
      try {
        await createRequest(`list/${listId}/item/${item.id}?text=${editedItemName}`, 'PATCH');

        setOriginalItemName(editedItemName);
      } catch (error) {
        setErrorMessage(`error updating item name:' ${error}`);
      }
    }
  };

  return (
    <>
      <li
        display={showList ? 'flex' : 'none'}
        className="individual-item"
        justifyContent="center"
        alignItems="center"
        gap="2"
        key={item.id}
        style={isClicked ? { opacity: '0.5', background: 'lightseagreen' } : {}}
      >
        {isClicked ? (
          <MdDoneOutline
            onClick={() => setIsClicked(prevState => !prevState)}
            className="icon"
            style={{ background: 'seagreen', marginRight: '0.25em' }}
          />
        ) : (
          <ImCheckboxUnchecked
            onClick={() => setIsClicked(prevState => !prevState)}
            className="icon save-icon"
            style={{ marginRight: '0.25em' }}
          />
        )}
        {isItemEdited ? (
          <>
            <input
              className="editing-list-input"
              type="text"
              value={editedItemName}
              ref={inputRef}
              onChange={e => setEditedItemName(e.target.value)}
              onKeyDown={event => event.key === 'Enter' && handleEditItem()}
              alignSelf="center"
            />
            <MdOutlineFileDownloadDone onClick={() => handleEditItem()} className="icon save-icon" />
          </>
        ) : (
          <p
            style={
              isClicked
                ? {
                    textDecoration: 'line-through',
                    textDecorationColor: 'green',
                  }
                : {}
            }
          >
            {editedItemName}
          </p>
        )}
        {isItemEdited ? (
          <MdOutlineCancel
            onClick={() => {
              setIsItemEdited(prevState => !prevState);
              handleCancelEdit();
            }}
            className="icon delete-icon"
          />
        ) : (
          <AiOutlineEdit
            className="icon"
            onClick={() => {
              setIsItemEdited(prevState => !prevState);
            }}
          />
        )}

        <RiDeleteBin6Line
          onClick={() => handleDeleteItem(item.id)}
          style={{ marginLeft: 'auto' }}
          className="icon delete-icon"
        />
      </li>
      <div style={{ display: showList ? 'flex' : 'none' }}>
        {[...new Array(10)].map((_, index) => (
          <div b="1">{index}</div>
        ))}
      </div>
    </>
  );
}

export default IndividualItem;
