import React, { forwardRef, useEffect, useRef } from "react";

interface Props {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClick: () => Promise<void>,
  onClick1: () => void,

}

const EditingListInput = forwardRef<HTMLInputElement, Props>(({ value, onChange, onClick, onClick1 }: Props, forwardedInputRef) => {
  return <>
    <input
      className="editing-list-input"
      type="text"
      placeholder="Add item"
      value={value}
      onChange={onChange}
      ref={forwardedInputRef}

    />
    <button onClick={onClick}>✔</button>
    <button onClick={onClick1}>X</button>
  </>;
})

export default EditingListInput;