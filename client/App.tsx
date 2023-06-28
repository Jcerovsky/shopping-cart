import React, { useContext, useEffect, useRef } from 'react';
import ShoppingList from './components/./ShoppingList';
import Input from './components/Input';
import './index.css';
import { AppContext } from './AppContext';
import { createRequest } from './utils/createRequest';

function App() {
  const {
    setAllLists,
    setList,
    setIsDisabled,
    isDisabled,
    list,
    allLists,
    pageCount,
    currentPage,
    setCurrentPage,
    setPageCount,
    limitPerPage,
    setErrorMessage,
  } = useContext(AppContext)!;

  const inputRef = useRef<HTMLInputElement>(null);

  const getData = () => {
    createRequest(`list?limit=${limitPerPage}&page=${currentPage}`, 'GET').then(data => {
      setPageCount(data.pageCount < 1 ? 1 : data.pageCount);
      setAllLists(data.filtered);
    });
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value.length > 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [list]);

  const handleClick = async () => {
    const name = inputRef.current?.value;

    if (name === undefined) return;

    if (name.length > 2) {
      setErrorMessage('');
      try {
        const data = (await createRequest(`list?name=${name}`, 'POST')) as number;

        if (allLists.length === limitPerPage && currentPage === pageCount) {
          setCurrentPage(prevState => prevState + 1);
        }

        // when on a different page and adding list - move to the last page

        if (allLists.length >= limitPerPage - 1) {
          if (currentPage < pageCount) {
            setCurrentPage(pageCount < 1 ? 1 : pageCount);
          }
        }

        if (pageCount === currentPage || allLists.length < limitPerPage) {
          setAllLists(prevState => [...prevState, { name: name, id: data }]);
        }
      } catch (error) {
        setErrorMessage(`error posting data: ${error}`);
      }

      setList('');
    } else if (name.length < 3) {
      setErrorMessage('error: items need to be at least three characters long');
      return;
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar--heading">
          <h1 className="navbar--heading__text">SHOPPING LIST</h1>
        </div>
        <div display="flex" justifyContent="center">
          <Input ref={inputRef} handleClick={handleClick} />
          <button className="navbar--button" disabled={isDisabled} onClick={handleClick}>
            ADD
          </button>
        </div>
      </div>
      <ShoppingList />
      <div display="flex" justifyContent="center" alignItems="center">
        <p>Pages</p>
        {[...new Array(pageCount)].map((_, index) => (
          <div
            cursor="pointer"
            onClick={() => setCurrentPage(index + 1)}
            p="2"
            border="1"
            borderRadius="50"
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
