import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../App.css';
import { AppContext } from '../AppContext';
import { createRequest } from '../utils/createRequest';
import { ShoppingItems } from '../ShoppingCartProps';

interface Props {
  id: number;
  allItems: ShoppingItems[];
}

function DeleteListButton({ id, allItems }: Props) {
  const { setAllLists } = useContext(AppContext)!;

  const handleDelete = async () => {
    const listToDelete = allItems.filter(item => item.listId === id);
    try {
      await Promise.all(
        listToDelete.map(async item => {
          await createRequest(`list/${item.listId}`, 'DELETE');
        })
      );
      if (listToDelete?.length === 0) {
        await createRequest(`list/${id}`, 'DELETE');
      }
    } catch (error) {
      throw new Error(`Error deleting item:' ${error}`);
    }

    setAllLists(prevList => prevList.filter(item => item.id !== id));
  };

  return <RiDeleteBin6Line onClick={handleDelete} className="icon delete-icon" />;
}

export default DeleteListButton;
