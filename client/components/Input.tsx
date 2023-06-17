import React, { forwardRef } from "react";
import "../App.css";

interface InputRefProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  list: string;
  setList: (value: ((prevState: string) => string) | string) => void;
  ref: (instance: unknown | null) => void;
  errorColor: string;
}

const Input = forwardRef(
  ({ forwardedRef, list, setList, errorColor }: InputRefProps, ref) => {
    const style = {
      backgroundColor: errorColor,
    };

    return (
      <input
        type="text"
        placeholder="ADD NEW LIST"
        value={list}
        onChange={(e) => setList(e.target.value)}
        ref={forwardedRef}
        className="navbar--input"
        style={style}
      />
    );
  }
);

export default Input;
