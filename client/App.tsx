import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "./ShoppingCartProps";
import ShoppingList from "./components/./ShoppingList";
import Input from "./components/Input";
import "./App.css";

function App() {
  const [list, setList] = useState<string>("");
  const [allLists, setAllLists] = useState<ShoppingCart[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await fetch("http://127.0.0.1:1337/list");
    const data = await response.json();
    setAllLists(data);
  };

  const handleClick = async () => {
    const name = inputRef.current?.value;

    if (name === undefined) return;

    if (name.length > 2) {
      try {
        const response = await fetch(
          `http://127.0.0.1:1337/list?name=${name}`,
          {
            method: "POST",
          }
        );

        const data = (await response.json()) as number;

        setAllLists((prevState) => [...prevState, { name, id: data }]);
      } catch (error) {
        throw new Error(`Error posting data. The error is ${error}`);
      }

      setList("");
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
        <h1 className="navbar--heading">Shopping List</h1>
        <div display="flex" justifyContent="center">
          <Input
            forwardedRef={inputRef}
            list={list}
            setList={setList}
            handleClick={handleClick}
          />
          <button
            className="navbar--button"
            disabled={isDisabled}
            onClick={handleClick}
          >
            ADD
          </button>
        </div>
      </div>
      <ShoppingList allLists={allLists} setAllLists={setAllLists} />
    </>
  );
}

export default App;
