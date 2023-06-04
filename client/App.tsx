import React, {useEffect, useRef, useState} from 'react';
import {ShoppingCart} from './InterfaceShoppingCart'

function App() {

    const [item, setItem] = useState<string>('')
    const [allItems, setAllItems] = useState<ShoppingCart[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    console.log(allItems)

    const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:1337/list')
        const data = await response.json()
        setAllItems(data)
    }

    useEffect(() => {
        fetchData()

    }, [])

    const handleClick = () => {

        fetch(`http://127.0.0.1:1337/list?name=${inputRef.current?.value}&completed=false&id=${crypto.randomUUID()}`, {
            method: 'POST',
        })
        setItem('')
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
            <div>
                {
                    allItems.length !== 0 && allItems.map(item => <h1>{item.name}</h1>)
                }
                <button>X</button>
            </div>
        </div>
    );
}

export default App;
