import React from "react";
import {ShoppingCart} from "../InterfaceShoppingCart";
import IndividualItem from "./IndividualItem";

interface ShoppingItemsProps {
    allItems: ShoppingCart[],
    fetchData: () => void,
    setAllItems:  React.Dispatch<React.SetStateAction<ShoppingCart[]>>,
}

function ShoppingItems({allItems, fetchData, setAllItems}: ShoppingItemsProps) {
    return (
        <div>
            <ul>
            {
                allItems.length !== 0? allItems.map(item => (
                    <IndividualItem item={item} key={item.id} setAllItems={setAllItems} fetchData={fetchData}/>
                )) : <p>Your cart is empty</p>
            }
            </ul>
        </div>
    );
}

export default ShoppingItems;