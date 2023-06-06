import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "./ShoppingCartProps";
import ShoppingList from "./components/./ShoppingList";
import Input from "./components/Input";

function App() {
  const [list, setList] = useState<string>("");
  const [allLists, setAllLists] = useState<ShoppingCart[]>([]);

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

    if (name) {
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

  return (
    <div>
      <h1>Shopping List</h1>
      <Input forwardedRef={inputRef} list={list} setList={setList} />
      <button onClick={handleClick}>Add</button>
      <ShoppingList allLists={allLists} setAllLists={setAllLists} />
    </div>
  );
}

export default App;
