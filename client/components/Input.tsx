import React, {useState, forwardRef} from 'react';

interface InputRefProps {
    forwardedRef: React.RefObject<HTMLInputElement>,
}

const Input = forwardRef(({forwardedRef} : InputRefProps) => {
    const [item, setItem] = useState<string>('')

    return (
        <input
            type="text"
            placeholder='Add item'
            value={item}
            onChange={(e) => setItem(e.target.value)}
            ref={forwardedRef}
        />
    );
})

export default Input;