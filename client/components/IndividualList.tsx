import React, { useContext, useEffect, useRef, useState } from 'react';
import { IndividualListProps, ShoppingCart } from '../ShoppingCartProps';
import DeleteListButton from './DeleteListButton';
import IndividualItem from './IndividualItem';
import EditingListInput from './EditingListInput';
import '../App.css';

import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel, MdOutlineFileDownloadDone } from 'react-icons/md';
import { IoIosAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { createRequest } from '../utils/createRequest';
import { AppContext } from '../AppContext';

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

  const [itemPageCount, setItemPageCount] = useState<number>(1);
  const [currentItemPage, setCurrentItemPage] = useState<number>(1);

  const { editedListName, originalListName, editingList, isAddItemBtnClicked, showList, allItems, item } = state;

  const { setErrorMessage, limitPerPage } = useContext(AppContext)!;

  useEffect(() => {
    createRequest(`list/${list.id}/item`, 'GET').then(data => {
      setState(prevState => ({
        ...prevState,
        allItems: data,
      }));
    });
  }, []);

  useEffect(() => {
    focusOnInput();
  }, [editingList]);

  useEffect(() => {
    getPageData();
  }, [currentItemPage]);

  useEffect(() => {
    if (isAddItemBtnClicked && addItemInputRef.current) {
      addItemInputRef.current.focus();
    }
  }, [isAddItemBtnClicked]);

  const handleAddItem = async (): Promise<void> => {
    if (item.length < 3) {
      setErrorMessage('error: items need to be at least three characters long');
      return;
    }

    try {
      const data = await createRequest(`list/${list.id}/item?text=${item}`, 'POST');
      const newItem = {
        id: data,
        text: item as string,
        isDone: 0,
        listId: list.id,
      };

      if (allItems.length === limitPerPage && currentItemPage === itemPageCount) {
        setCurrentItemPage(prevState => prevState + 1);
        getPageData();
      }

      // when on a different page and adding item - move to the last page

      if (allItems.length >= limitPerPage - 1) {
        if (currentItemPage < itemPageCount) {
          setCurrentItemPage(itemPageCount < 1 ? 1 : itemPageCount);
        }
      }

      if (itemPageCount === currentItemPage || allItems.length < limitPerPage) {
        setState(prevState => ({
          ...prevState,
          allItems: [...allItems, newItem],
          item: '',
        }));
      }
      setState(prevState => ({
        ...prevState,
        showList: true,
      }));
    } catch (error) {
      setErrorMessage(`error adding item:' ${error}`);
    }
  };

  const handleEditListClick = async () => {
    if (editedListName.length < 3) {
      setErrorMessage('error: list name needs to be at least three characters long');
      return;
    }
    setErrorMessage('');
    setState(prevState => ({
      ...prevState,
      editingList: false,
      editedListName: editedListName,
    }));

    if (editedListName === originalListName) return;
    try {
      await createRequest(`list/${list.id}?name=${editedListName}`, 'PATCH');

      setState(prevState => ({
        ...prevState,
        originalListName: editedListName,
      }));
    } catch (error) {
      setErrorMessage(`error updating list name:' ${error}`);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (allItems.length === 1) {
      setCurrentItemPage(currentItemPage - 1);
    }
    try {
      await createRequest(`list/${list.id}/item/${itemId}`, 'DELETE');

      setState(prevState => ({
        ...prevState,
        allItems: allItems.filter(item => item.id !== itemId),
      }));
    } catch (error) {
      setErrorMessage(`error deleting item:' ${error}`);
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

  //fetches once for each list and displays the items in that particular list - not a bug
  const getPageData = () => {
    createRequest(`list/${list.id}/item?limit=${limitPerPage}&page=${currentItemPage}`, 'GET').then(data => {
      setItemPageCount(data.pageCount < 1 ? 1 : data.pageCount);
      setState(prevState => ({
        ...prevState,
        allItems: data.filtered,
      }));
    });
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
            handleEditListClick={handleEditListClick}
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
        <>
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
          <div style={{ display: showList ? 'flex' : 'none', justifyContent: 'right' }}>
            {[...new Array(itemPageCount)].map((_, index) => (
              <div border="1" onClick={() => setCurrentItemPage(index + 1)} key={index}>
                <span style={{ backgroundColor: index + 1 === currentItemPage ? 'red' : undefined }}>{index + 1}</span>
              </div>
            ))}
          </div>{' '}
        </>
      </ul>
    </div>
  );
}

export default IndividualList;
