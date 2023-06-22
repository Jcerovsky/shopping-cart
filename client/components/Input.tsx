import React, { forwardRef, useContext } from "react";
import "../App.css";
import { AppContext } from "../AppContext";

interface InputRefProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  handleClick: () => void;
}

const Input = forwardRef(
  ({ forwardedRef, handleClick }: InputRefProps, ref) => {
    const { list, setList } = useContext(AppContext)!;

    return (
      <input
        type="text"
        placeholder="ADD NEW LIST"
        value={list}
        onChange={(e) => setList(e.target.value)}
        ref={forwardedRef}
        className="navbar--input"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleClick();
          }
        }}
      />
    );
  }
);

export default Input;
