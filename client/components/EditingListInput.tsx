import React, { forwardRef } from "react";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import "../App.css";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
}

const EditingListInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onClick }: Props, forwardedInputRef) => {
    return (
      <>
        <input
          className="editing-list-input"
          type="text"
          placeholder="Add item"
          value={value}
          onChange={onChange}
          ref={forwardedInputRef}
          onKeyDown={(event) => event.key === "Enter" && onClick()}
        />
        <MdOutlineFileDownloadDone
          onClick={onClick}
          className="icon save-icon"
        />
      </>
    );
  }
);

export default EditingListInput;
