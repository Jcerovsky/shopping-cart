import React from 'react';
import {ShoppingCart} from "../InterfaceShoppingCart";
import DeleteButton from "./DeleteButton";

interface IndividualItemProps {
    item: ShoppingCart,
    fetchData: () => void,
}

function IndividualItem({item, fetchData} : IndividualItemProps) {
    return (
        <div key={item.id}>
            <li display='flex'>
                <p>{item.name}</p>
                <DeleteButton id={item.id}  fetchData={fetchData} />
            </li>
        </div>
    );
}

export default IndividualItem;