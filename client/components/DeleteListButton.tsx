import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../App.css';
import { AppContext } from '../AppContext';
import { createRequest } from '../utils/createRequest';

interface Props {
  id: number;
}

function DeleteListButton({ id }: Props) {
  const { setAllLists, allLists, currentPage, limitPerPage, setErrorMessage, setPageCount, setCurrentPage, pageCount } =
    useContext(AppContext)!;

  const fetchDataAndSetLists = async () => {
    try {
      const nextPageData = await createRequest(`list?limit=${limitPerPage}&page=${currentPage + 1}`, 'GET');
      const nextPageList = await nextPageData.filtered;
      const updatedPageCount = await nextPageData.pageCount;
      //slices lists on the following page and fills empty spot in the current list
      const slicedNextPageList = nextPageList.slice(0, limitPerPage - allLists.length);
      setAllLists(prevState => [...prevState, ...slicedNextPageList]);
      setPageCount(updatedPageCount < 1 ? 1 : updatedPageCount);
    } catch (error) {
      setErrorMessage(`error updating list:' ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      await createRequest(`list/${id}`, 'DELETE');
      setAllLists(prevList => prevList.filter(item => item.id !== id));
      await fetchDataAndSetLists();
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
