import React from 'react';
import {ShoppingCart} from "../ShoppingCartProps";
import DeleteButton from "./DeleteButton";

interface IndividualItemProps {
    list: ShoppingCart,
    setAllLists: (value: (((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[])) => void,
}

function IndividualList({list, setAllLists} : IndividualItemProps) {
    return (
        <div>
            <li display='flex'>
                <p>{list.name}</p>
                <DeleteButton id={list.id} setAllLists={setAllLists} />
            </li>
        </div>
    );
}

export default IndividualList;