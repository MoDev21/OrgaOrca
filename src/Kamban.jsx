import PropTypes from 'prop-types';
import { useEffect, useState, useRef} from 'react';
import './Kamban.css';
import { TodoItem } from './TodoItem';
import { KambanColumn } from './KambanColumn';


const Kamban = (editTodo) => {
    const scrollRef = useRef(null);
    const [hscrolling, setHscrolling] = useState(false);


    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0);
    const startHscrolling = () => setHscrolling(true);



    let transitionSpeed = 330;
    

    function stopHscrolling(interval) {
        console.log('stopHscrolling');
        setHscrolling(false);
        clearInterval(interval);
    }


    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("COLUMN")
        if (localValue == null) return [[], [], []]
        
        return JSON.parse(localValue)

    });

    console.log(todos);



    useEffect(() => {
        localStorage.setItem("COLUMN", JSON.stringify(todos))

        let interval;
        let scrollSpeed = 2;
        
        if (hscrolling && scrollRef.current) {
            interval = setInterval(() => {
                console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
                console.log(scrollRef.current.scrollLeft);
                if (scrollRef.current.scrollLeft < (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)){
                    
                    scrollRef.current.scrollLeft += scrollSpeed;
                    
                }
                else if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)) {
                    console.log(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
                    console.log(scrollRef.current.scrollLeft);
                    console.log(`hscrolling ${hscrolling}`);
                    setHscrolling(false);
                    clearInterval(interval);
                }
                
            }, .01);
        } else {
            setHscrolling(false);
        }

    }, [todos])

    function addColumn() {
        setTodos([...todos, []]);
        startHscrolling();
        
    }

    function removeColumn() {
        setTodos(todos.slice(0, todos.length - 1));
    }

    function toggleTodo(boardIndex, id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map((boardTodos, index) => {
                if(index === boardIndex){
                    return boardTodos.map(todo => {
                        if(todo.id === id){
                            return { ...todo, completed }
                        }
                        return todo;
                    });
                }
                return boardTodos;
            })
        })
    }
    
    function deleteTodo(boardIndex, id) {
        setTodos(currentTodos => {
            return currentTodos.map((boardTodos, index) => {
                if(index === boardIndex){
                    return boardTodos.filter(todo => todo.id !== id)
                }
                return boardTodos;
            });
        });
    }

    


    function handleDrop(boardIndex, e) {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        e.currentTarget.style.transition = transitionSpeed + "ms";
        e.currentTarget.style.scale = 1;
        
        if (data.boardIndex !== boardIndex) {
            
            setTodos(currentTodos => {
                return currentTodos.map((boardTodos, index) => {
                    if(index === boardIndex){
                        console.log(`boardIndex: ${boardIndex} index: ${index} `);
                        console.log(boardTodos);
                        return [...boardTodos, data];
                    }
                    else {
                        console.log(`boardIndex: ${boardIndex} `);
                        return boardTodos.filter(todo => todo.id !== data.id);
                    }
                    return boardTodos;
                });
            });
            console.log(data.boardIndex, boardIndex);
            console.log(data);
        }return;

        
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.style.transition = transitionSpeed + "ms";
        e.currentTarget.style.scale = 1.05;
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.style.transition = transitionSpeed + "ms";
        e.currentTarget.style.scale = 1;
    }

    const handleWheel = (e) => {
        e.preventDefault();
        scrollRef.current.scrollLeft -= (e.deltaY * 1);
        clearInterval(interval);
    };

    const onKambanHover = (e) => {
        e.preventDefault();
        document.body.style.overflowY = "hidden";
    }

    const onKambanHoverLeave = (e) => {
        e.preventDefault();
        document.body.style.overflowY = "auto";
    }

    return (
        <div className="kamban-board" ref={scrollRef} onWheel={handleWheel} onMouseEnter={onKambanHover} onMouseLeave={onKambanHoverLeave}>
            {todos.map((boardTodos, boardIndex) => (
                <KambanColumn
                    key={boardIndex}
                    boardTodos={boardTodos}
                    boardIndex={boardIndex}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    removeColumn={removeColumn}
                    addColumn={addColumn}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    draggable={true}
                    copyTodo={true}
                    editTodo={editTodo}
                />
            ))}
            <button onClick={addColumn} className='button-add-column'>Add Column</button>
        </div>
    );
};
        

export default Kamban;
