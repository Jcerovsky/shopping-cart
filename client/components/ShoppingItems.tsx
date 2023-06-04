import React from "react";
import {ShoppingCart} from "../InterfaceShoppingCart";
import IndividualItem from "./IndividualItem";

interface ShoppingItemsProps {
    allItems: ShoppingCart[]
}

function ShoppingItems({allItems}: ShoppingItemsProps) {
    return (
        <div>
            <ul>
            {
                allItems.length !== 0? allItems.map(item => (
                    <IndividualItem item={item} key={item.id} />
                )) : <p>Your cart is empty</p>
            }
            </ul>
        </div>
    );
}

export default ShoppingItems;