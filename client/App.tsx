import React, {useEffect, useRef, useState} from 'react';
import {ShoppingCart} from './InterfaceShoppingCart'
import ShoppingItems from "./components/ShoppingItems";

function App() {

    const [item, setItem] = useState<string>('')
    const [allItems, setAllItems] = useState<ShoppingCart[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:1337/list')
        const data = await response.json()
        setAllItems(data)
    }

    useEffect(() => {
        fetchData()

    }, [])

    const handleClick = () => {

        fetch(`http://127.0.0.1:1337/list?name=${inputRef.current?.value}`, {
            method: 'POST',
        })
        setItem('')
        fetchData()
    }


    return (
        <div>
            <h1>Shopping List</h1>
            <input
                type="text"
                placeholder='Add item'
                value={item}
                onChange={(e) => setItem(e.target.value)}
                ref={inputRef}
            />
            <button onClick={handleClick}>Add</button>
            <ShoppingItems allItems={allItems} fetchData={fetchData} setAllItems={setAllItems}/>
        </div>
    )
}

export default App;
