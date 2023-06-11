import React from "react";



function EditingListInput(props: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onClick: () => Promise<void>, onClick1: () => void }) {
  return <>
    <input
      className="editing-list-input"
      type="text"
      placeholder="Add item"
      value={props.value}
      onChange={props.onChange}
    />
    <button onClick={props.onClick}>✔</button>
    <button onClick={props.onClick1}>X</button>
  </>;
}

export default EditingListInput;