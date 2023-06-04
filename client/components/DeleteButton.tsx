import React from 'react';
import {ShoppingCart} from "../InterfaceShoppingCart";

interface DeleteButtonProps {
    id: number,
    fetchData: () => void
}

function DeleteButton({id,fetchData} : DeleteButtonProps) {

    const handleDelete = async () => {
        try {
            await fetch(`http://127.0.0.1:1337/list/${id}`, {
                method: "DELETE"
            })
            fetchData()
        }
        catch (error) {
            throw new Error(`Error deleting item:' ${error}`)
        }

    }


    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteButton;