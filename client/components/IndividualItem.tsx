import React from 'react';
import {ShoppingCart} from "../InterfaceShoppingCart";
import DeleteButton from "./DeleteButton";

interface IndividualItemProps {
    item: ShoppingCart,
}

function IndividualItem({item} : IndividualItemProps) {
    return (
        <div key={item.id}>
            <li display='flex'>
                <p>{item.name}</p>
                <DeleteButton id={item.id} />
            </li>
        </div>
    );
}

export default IndividualItem;