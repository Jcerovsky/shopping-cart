import React, {forwardRef} from 'react';

interface InputRefProps {
    forwardedRef: React.RefObject<HTMLInputElement>,
    list: string,
    setList: (value: (((prevState: string) => string) | string)) => void,
    ref:  ((instance: (unknown | null)) => void),
}

const Input = forwardRef(({forwardedRef, list, setList} : InputRefProps, ref) => {

    return (
        <input
            type="text"
            placeholder='Add list'
            value={list}
            onChange={(e) => setList(e.target.value)}
            ref={forwardedRef}
        />
    );
})

export default Input;