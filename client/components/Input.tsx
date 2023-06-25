import React, { forwardRef, useContext } from 'react';
import '../App.css';
import { AppContext } from '../AppContext';

interface Props {
  handleClick: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(({ handleClick }: Props, inputRef) => {
  const { list, setList } = useContext(AppContext)!;

  return (
    <input
      type="text"
      placeholder="ADD NEW LIST"
      value={list}
      onChange={e => setList(e.target.value)}
      ref={inputRef}
      className="navbar--input"
      onKeyDown={event => {
        if (event.key === 'Enter') {
          handleClick();
        }
      }}
    />
  );
});

export default Input;
