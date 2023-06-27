import React, { forwardRef } from 'react';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import '../App.css';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditListClick: () => Promise<void>;
  editedListName: string;
}

const EditingListInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, handleEditListClick, editedListName }: Props, forwardedInputRef) => {
    return (
      <>
        <input
          className="editing-list-input"
          type="text"
          value={editedListName}
          onChange={onChange}
          ref={forwardedInputRef}
          onKeyDown={event => event.key === 'Enter' && handleEditListClick()}
        />
        <MdOutlineFileDownloadDone onClick={handleEditListClick} className="icon save-icon" />
      </>
    );
  }
);

export default EditingListInput;
