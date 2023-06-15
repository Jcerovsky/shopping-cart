import React, { forwardRef } from "react";
import { GiConfirmed } from 'react-icons/gi'

interface Props {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClick: () => Promise<void>,
  backgroundColor: string

}

const EditingListInput = forwardRef<HTMLInputElement, Props>(({ value, onChange, onClick, backgroundColor }: Props, forwardedInputRef) => {

  const style = {
    backgroundColor
  }
  return <>
    <input
      className="editing-list-input"
      type="text"
      placeholder="Add item"
      value={value}
      onChange={onChange}
      ref={forwardedInputRef}
      style={style}

    />
    <GiConfirmed onClick={onClick} style={{fontSize:'2em'}} />
  </>;
})

export default EditingListInput;