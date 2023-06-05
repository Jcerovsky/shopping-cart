import React from 'react';
import {ShoppingCart} from "../ShoppingCartProps";

interface DeleteButtonProps {
    id: number,
    setAllLists: (value: (((prevState: ShoppingCart[]) => ShoppingCart[]) | ShoppingCart[])) => void,
}

function DeleteButton({id, setAllLists} : DeleteButtonProps) {

    const handleDelete =  async () => {

        try {
            await fetch(`http://127.0.0.1:1337/list/${id}`, {
                method: "DELETE"
            })
        }
        catch (error) {
            throw new Error(`Error deleting item:' ${error}`)
        }
        setAllLists(prevList => prevList.filter(item => item.id!==id))

    }


    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteButton;