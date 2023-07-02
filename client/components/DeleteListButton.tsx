import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../App.css';
import { AppContext } from '../AppContext';
import { createRequest } from '../utils/createRequest';

interface Props {
  id: number;
}

function DeleteListButton({ id }: Props) {
  const { setAllLists, allLists, currentPage, setErrorMessage, setCurrentPage } = useContext(AppContext)!;

  const handleDelete = async () => {
    try {
      await createRequest(`list/${id}`, 'DELETE');
      setAllLists(prevList => prevList.filter(item => item.id !== id));
    } catch (error) {
      setErrorMessage(`error deleting item:' ${error}`);
    }

    //THIS WILL GO TO THE PREVIOUS PAGE IF NO LISTS ON THE PAGE
    if (allLists.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return <RiDeleteBin6Line onClick={handleDelete} className="icon delete-icon" />;
}

export default DeleteListButton;
