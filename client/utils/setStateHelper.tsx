import { IndividualListProps } from "../ShoppingCartProps";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  newData: Partial<IndividualListProps>;
  setState: Dispatch<SetStateAction<IndividualListProps>>;
}

const setStateHelper = ({ newData, setState }: Props) => {
  setState((prevState) => ({
    ...prevState,
    ...newData,
  }));
};

export { setStateHelper };
