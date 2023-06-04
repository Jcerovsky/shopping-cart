import React from 'react';
import {ShoppingCart} from "../InterfaceShoppingCart";

interface DeleteButtonProps {
    id: number,
}

function DeleteButton({id} : DeleteButtonProps) {

    const handleDelete = () => {
        fetch(`http://127.0.0.1:1337/list/${id}`, {
            method: "DELETE"
        })
    }


    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteButton;