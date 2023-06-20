import React, { useContext, useEffect, useRef } from "react";
import ShoppingList from "./components/./ShoppingList";
import Input from "./components/Input";
import "./index.css";
import { AppContext } from "./AppContext";

function App() {
  const appContext = useContext(AppContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await fetch("http://127.0.0.1:1337/list");
    const data = await response.json();
    appContext?.setAllLists(data);
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

        appContext?.setAllLists((prevState) => [
          ...prevState,
          { name, id: data },
        ]);
      } catch (error) {
        throw new Error(`Error posting data. The error is ${error}`);
      }

      appContext?.setList("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      if (inputRef.current?.value.length > 2) {
        appContext?.setIsDisabled(false);
      } else {
        appContext?.setIsDisabled(true);
      }
    }
  }, [appContext?.list]);

  return (
    <>
      <div className="navbar">
        <div className="navbar--heading">
          <h1 className="navbar--heading__text">SHOPPING LIST</h1>
        </div>
        <div display="flex" justifyContent="center">
          <Input forwardedRef={inputRef} handleClick={handleClick} />
          <button
            className="navbar--button"
            disabled={appContext?.isDisabled as boolean}
            onClick={handleClick}
          >
            ADD
          </button>
        </div>
      </div>
      <ShoppingList />
    </>
  );
}

export default App;
