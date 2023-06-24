import React, { useContext, useEffect, useRef } from 'react';
import ShoppingList from './components/./ShoppingList';
import Input from './components/Input';
import './index.css';
import { AppContext } from './AppContext';
import { createRequest } from './utils/createRequest';

function App() {
  const { setAllLists, setList, setIsDisabled, isDisabled, list } = useContext(AppContext)!;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await createRequest('list', 'GET');
    const data = await response.json();
    setAllLists(data);
  };

  const handleClick = async () => {
    const name = inputRef.current?.value;

    if (name === undefined) return;

    if (name.length > 2) {
      try {
        const response = await createRequest(`list?name=${name}`, 'POST');
        const data = (await response.json()) as number;

        setAllLists(prevState => [...prevState, { name, id: data }]);
      } catch (error) {
        throw new Error(`Error posting data. The error is ${error}`);
      }

      setList('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      if (inputRef.current?.value.length > 2) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [list]);

  return (
    <>
      <div className="navbar">
        <div className="navbar--heading">
          <h1 className="navbar--heading__text">SHOPPING LIST</h1>
        </div>
        <div display="flex" justifyContent="center">
          <Input forwardedRef={inputRef} handleClick={handleClick} />
          <button className="navbar--button" disabled={isDisabled as boolean} onClick={handleClick}>
            ADD
          </button>
        </div>
      </div>
      <ShoppingList />
    </>
  );
}

export default App;
