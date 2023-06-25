import React, { useEffect, useState } from 'react';
import { MdDoneOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { IndividualItemProps } from '../ShoppingCartProps';
import '../App.css';
import { createRequest } from '../utils/createRequest';

function IndividualItem({ handleDeleteItem, listId, item, showList, allItems, setState }: IndividualItemProps) {
  const [isClicked, setIsClicked] = useState(item.isDone === 1);

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
      console.log(`Failed updating item: ${error}`);
    }
  }, [isClicked]);

  return (
    <li
      display={showList ? 'flex' : 'none'}
      className="individual-item"
      key={item.id}
      style={isClicked ? { opacity: '0.5', background: 'lightseagreen' } : {}}
    >
      {isClicked ? (
        <MdDoneOutline
          onClick={() => setIsClicked(prevState => !prevState)}
          className="icon"
          style={{ background: 'seagreen' }}
        />
      ) : (
        <ImCheckboxUnchecked onClick={() => setIsClicked(prevState => !prevState)} className="icon save-icon" />
      )}
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
        {item.text}
      </p>
      <RiDeleteBin6Line
        onClick={() => handleDeleteItem(item.id)}
        style={{ marginLeft: 'auto' }}
        className="icon delete-icon"
      />
    </li>
  );
}

export default IndividualItem;
