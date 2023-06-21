import React, { forwardRef, useContext, useState } from "react";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import "../App.css";
import { AppContext } from "../AppContext";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  editedListName: string;
}

const EditingListInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, onClick, editedListName }: Props, forwardedInputRef) => {
    return (
      <>
        <input
          className="editing-list-input"
          type="text"
          placeholder="Add item"
          value={editedListName}
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
