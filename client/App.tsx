import React, { useContext, useEffect, useRef, useState } from 'react';
import ShoppingList from './components/./ShoppingList';
import Input from './components/Input';
import './index.css';
import { AppContext } from './AppContext';
import { createRequest } from './utils/createRequest';

function App() {
  const { setAllLists, setList, setIsDisabled, isDisabled, list, allLists } = useContext(AppContext)!;
  const [pageCount, setPageCount] = useState<number>(0);
  const [listCount, setListCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);

  const getData = () => {
    createRequest(`list?page=${currentPage}`, 'GET').then(data => {
      setPageCount(data.pageCount);
      setListCount(data.limit);
      setAllLists(data.filteredLists);
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
      try {
        const data = (await createRequest(`list?name=${name}`, 'POST')) as number;

        if (pageCount === currentPage && allLists.length < listCount) {
          setAllLists(prevState => [...prevState, { name: name, id: data }]);
        }
      } catch (error) {
        throw new Error(`Error posting data. The error is ${error}`);
      }

      setList('');
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
        {[...new Array(pageCount)].map(($, index) => (
          <div cursor="pointer" onClick={() => setCurrentPage(index + 1)} p="2" border="1" key={index}>
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
