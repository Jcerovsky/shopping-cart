import React, { forwardRef } from "react";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import "../App.css";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  backgroundColor: string;
}

const EditingListInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onClick, backgroundColor }: Props, forwardedInputRef) => {
    const style = {
      backgroundColor,
    };
    return (
      <>
        <input
          className="editing-list-input"
          type="text"
          placeholder="Add item"
          value={value}
          onChange={onChange}
          ref={forwardedInputRef}
          style={style}
          onKeyDown={(event) => event.key === "Enter" && onClick()}
        />
        <MdOutlineFileDownloadDone
          onClick={onClick}
          className="icons save-icon"
        />
      </>
    );
  }
);

export default EditingListInput;
