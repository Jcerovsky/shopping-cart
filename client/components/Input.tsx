import React, { forwardRef } from "react";
import "../App.css";

interface InputRefProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  list: string;
  setList: (value: ((prevState: string) => string) | string) => void;
  ref: (instance: unknown | null) => void;
  handleClick: () => void;
}

const Input = forwardRef(
  ({ forwardedRef, list, setList, handleClick }: InputRefProps, ref) => {
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
