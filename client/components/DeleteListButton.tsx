import React, { useContext, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../App.css';
import { AppContext } from '../AppContext';
import { createRequest } from '../utils/createRequest';

interface Props {
  id: number;
}

function DeleteListButton({ id }: Props) {
  const { setAllLists, setErrorMessage, allLists, currentPage, limitPerPage, setPageCount } = useContext(AppContext)!;

  const fetchDataAndSetLists = async () => {
    try {
      const nextPageData = await createRequest(`list?limit=${limitPerPage}&page=${currentPage + 1}`, 'GET');
      const nextPageList = await nextPageData.filtered;
      const updatedPageCount = await nextPageData.pageCount;
      //slices lists on the following page and fills empty spot in the current list
      const slicedNextPageList = nextPageList.slice(0, Math.max(limitPerPage - allLists.length + 1), 0);
      setAllLists(prevState => [...prevState, ...slicedNextPageList]);
      setPageCount(updatedPageCount);
    } catch (error) {
      throw new Error(`Error deleting item:' ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      await createRequest(`list/${id}`, 'DELETE');
    } catch (error) {
      throw new Error(`Error deleting item:' ${error}`);
    }

    await fetchDataAndSetLists();
    setAllLists(prevList => prevList.filter(item => item.id !== id));
  };

  return <RiDeleteBin6Line onClick={handleDelete} className="icon delete-icon" />;
}

export default DeleteListButton;
