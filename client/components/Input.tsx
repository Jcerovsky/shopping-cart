import React, { forwardRef, useContext } from "react";
import "../App.css";
import { AppContext } from "../AppContext";

interface InputRefProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  handleClick: () => void;
}

const Input = forwardRef(
  ({ forwardedRef, handleClick }: InputRefProps, ref) => {
    const appContext = useContext(AppContext);

    return (
      <input
        type="text"
        placeholder="ADD NEW LIST"
        value={appContext?.list}
        onChange={(e) => appContext?.setList(e.target.value)}
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
