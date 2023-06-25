import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../App.css';
import { AppContext } from '../AppContext';
import { createRequest } from '../utils/createRequest';

interface Props {
  id: number;
}

function DeleteListButton({ id }: Props) {
  const { setAllLists } = useContext(AppContext)!;

  const handleDelete = () => {
    try {
      createRequest(`list/${id}`, 'DELETE');
    } catch (error) {
      throw new Error(`Error deleting item:' ${error}`);
    }

    setAllLists(prevList => prevList.filter(item => item.id !== id));
  };

  return <RiDeleteBin6Line onClick={handleDelete} className="icon delete-icon" />;
}

export default DeleteListButton;
