import PropTypes from 'prop-types';
import { useEffect, useState, useRef} from 'react';

export function RandomTodoChoice({todos}) {
    const [randomTodo, setRandomTodo] = useState(() => {
        const localValue = localStorage.getItem("RANDOM_TODO")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });
    

    useEffect(() => {
        localStorage.setItem("RANDOM_TODO", JSON.stringify(randomTodo))


    })

    return (
        <>
            <h1>{randomTodo}</h1>
            <button>Get Random Todo</button>
        </>

        
    )
}