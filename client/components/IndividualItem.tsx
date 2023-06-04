import React from 'react';
import {ShoppingCart} from "../InterfaceShoppingCart";
import DeleteButton from "./DeleteButton";

interface IndividualItemProps {
    item: ShoppingCart,
    fetchData: () => void,
    setAllItems:  React.Dispatch<React.SetStateAction<ShoppingCart[]>>
}

function IndividualItem({item, setAllItems, fetchData} : IndividualItemProps) {
    return (
        <div key={item.id}>
            <li display='flex'>
                <p>{item.name}</p>
                <DeleteButton id={item.id} setAllItems={setAllItems} fetchData={fetchData} />
            </li>
        </div>
    );
}

export default IndividualItem;